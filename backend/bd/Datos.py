import sqlite3
import random
from datetime import datetime

class Datos:
    def __init__(self, db_name='sgedatabase.db'):
        # Conectar a la base de datos (o crearla si no existe)
        self.db_name= db_name
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()

    def random_id_ssee(self, ssee):       
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
        try:
            # Si ssee es cero, busca una subestación aleatoria
            self.cursor.execute('SELECT min(idssee), max(idssee) FROM ssee;')
            min_ssee, max_ssee = self.cursor.fetchone()
            if max_ssee is not None and max_ssee > 0:
                ssee = random.randint(min_ssee, max_ssee)
            else:
                ssee = 1  # Valor por defecto si no hay registros
        except sqlite3.Error as e:        
            print(f"Error al obtener subestación aleatoria: {e}")
            ssee = 1  # Valor por defecto en caso de error
        finally:
            self.cursor.close
        return ssee    

    def obtiene_cts_from_ssee(self, ssee):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            cts= self.cursor.execute('SELECT ct.ct FROM ssee, alim, ct, clientes WHERE ssee.idssee=alim.idssee AND alim.alim=ct.alim AND ct.ct=clientes.ct AND clientes.logfin=0 AND ssee.idssee = ? ',(ssee,)).fetchall()
            return cts
        except sqlite3.Error as e:        
            print(f"Error al obtener subestación: {e}")
            return []
        finally:
            self.cursor.close

    def insertar_datos_log(self, descripcion):
        if descripcion is None:
            print("No se proporcionaron datos para insertar.")
            return 0
        
        try:
            self.cursor.execute('''
                INSERT INTO log (fecha, descripcion)
                VALUES (CURRENT_TIMESTAMP, ?)
            ''', (descripcion,))
            idlog = self.cursor.lastrowid
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'log'.")
            return idlog
        except sqlite3.Error as e:
            print(f"Fail: Error al insertar datos en la tabla 'log'. Detalle: {e}")
            return 0

    def normalizar_ct(self, cts):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
        if cts:
            try:
                for ct in cts:
                    afectacion= self.cursor.execute('select idafectacion, ct from afectaciones_elementos  where restitucion is null and ct = ? ',(ct[0],)).fetchall()
                    if afectacion:
                        logfin= self.insertar_datos_log(f"Normaliza CT {afectacion[0][1]} de la Afectacion {afectacion[0][0]}.")
                        # Normaliza Elementos
                        sql= '''
                            UPDATE afectaciones_elementos SET restitucion=CURRENT_TIMESTAMP, logfin= ? WHERE idafectacion = ? AND ct = ?
                        '''
                        self.cursor.execute(sql, (
                            logfin,
                            afectacion[0][0], 
                            afectacion[0][1]))  
                        # Normaliza Reclamos
                        sql= '''
                            UPDATE afectaciones_reclamos SET logfin= ? WHERE idafectacion = ? AND cuenta in (select cuenta from clientes where logfin=0 and ct= ?)
                        '''
                        self.cursor.execute(sql, (
                            logfin,
                            afectacion[0][0], 
                            afectacion[0][1]))  
                        self.conn.commit()                      
            except sqlite3.Error as e:        
                print(f"Error al obtener subestación: {e}")
            finally:
                self.cursor.close

    def normalizar_documentos_sinctsafectados(self):
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
        try:
            afectaciones= self.cursor.execute('select a.idafectacion from afectaciones a where a.restitucion is null and (select count(1) from afectaciones_elementos where idafectacion=a.idafectacion and restitucion is null)=0;').fetchall()
            for afectacion in afectaciones:
                logfin= self.insertar_datos_log(f"Normaliza Documento {afectacion[0]}.")
                sql= '''
                    UPDATE afectaciones SET restitucion=CURRENT_TIMESTAMP, logfin= ?, estado= ? WHERE idafectacion = ?
                '''
                self.cursor.execute(sql, (
                    logfin,
                    'Cerrado',
                    afectacion[0]))  
                self.conn.commit()                      
        except sqlite3.Error as e:        
            print(f"Error al obtener subestación: {e}")
        finally:
            self.cursor.close

    def generar_nro_afectacion(self, id):
        # Constante
        constante = 'A'
        # Año y mes actuales
        año_actual = datetime.now().strftime('%y')
        mes_actual = datetime.now().strftime('%m')
        # Formatear max_id con ceros a la izquierda
        max_id_formateado = f'{id:04d}'
        # Combinar en el formato deseado
        afectacion = f'{constante}-{año_actual}-{mes_actual}-{max_id_formateado}'
        # 
        return afectacion

    def nueva_afectacion(self, tipo):
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()        
        try:
            # Busca siguiente documento
            idafectacion= self.cursor.execute('SELECT MAX(idafectacion) FROM afectaciones;').fetchone()
            idafectacion = 1 if idafectacion[0] is  None else idafectacion[0] +1
            # Armar documento
            afectacion= self.generar_nro_afectacion(idafectacion)
            logini= self.insertar_datos_log(f"Nueva Afectacion con nro: {afectacion}.")
            logfin= 0
            # 
            self.cursor.execute('''
                INSERT INTO afectaciones (afectacion, tipo, estado, inicio, logini, logfin)
                VALUES (?, ?, 'Pendiente', CURRENT_TIMESTAMP, ?, ?)
            ''', (afectacion, tipo,logini,logfin,))
            id = self.cursor.lastrowid
            # Valido el max_id con el id insertado, deben ser el mismo sino cancelo
            if idafectacion==id:
                # Confirmar los cambios
                self.conn.commit()
                print("Success: Los datos se han insertado correctamente en la tabla 'afectaciones'.")
            else:
                raise Exception("el id buscado con respecto al insertado son diferentes. ")
            return idafectacion
        except sqlite3.Error as e:
            self.conn.rollback()
            self.cursor.close
            print(f"Fail: Error al insertar datos en la tabla 'afectaciones'. Detalle: {e}")
            return 0

    def nueva_afectacion_elementos(self, idafectacion, cts):
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()        
        try:
            cant=0
            for ct in cts:
                logini= self.insertar_datos_log(f"Nuevo Elemento Afectado ({ct[0]}) en Afectacion: {idafectacion}.")
                logfin= 0
                # 
                self.cursor.execute('''
                    INSERT INTO afectaciones_elementos (idafectacion, ct, inicio, logini, logfin)
                    VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?)
                ''', (idafectacion,ct[0],logini,logfin,))
                # id = self.cursor.lastrowid
                cant= 0 if cant==None else cant + 1
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'afectaciones'.")
            return cant
        except sqlite3.Error as e:
            self.conn.rollback()
            print(f"Fail: Error al insertar datos en la tabla 'afectaciones'. Detalle: {e}")
            return 0

    def nueva_afectacion_afectados(self, idafectacion, cts):
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()        
        try:
            cant=0
            for ct in cts:
                cuentas= self.cursor.execute('select cuenta from clientes where logfin=0 and ct= ?',(ct[0],)).fetchall()
                for cuenta in cuentas:
                    logini= self.insertar_datos_log(f"Nuevo Elemento Afectado ({ct[0]}) en Afectacion: {idafectacion}.")
                    logfin= 0
                    # 
                    self.cursor.execute('''
                        INSERT INTO afectaciones_afectados (idafectacion, cuenta, gestion, logini, logfin)
                        VALUES (?, ?, ?, ?, ?)
                    ''', (idafectacion,cuenta[0],'NUEVO',logini,logfin,))
                    cant+= 0 if cant==None else 1
                # id = self.cursor.lastrowid
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'afectaciones_afectados'.")
            return cant
        except sqlite3.Error as e:
            self.conn.rollback()
            print(f"Fail: Error al insertar datos en la tabla 'afectaciones_afectados'. Detalle: {e}")
            return 0
            
    def nueva_afectacion_reclamos(self, idafectacion):
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()        
        try:
            cant=0
            cuentas= self.cursor.execute('select cuenta from afectaciones_afectados where idafectacion = ?',(idafectacion,)).fetchall()
            for cuenta in cuentas:
                if random.randint(0,9)>0.8:
                    logini= self.insertar_datos_log(f"Nuevo Reclamo de la cuenta ({cuenta[0]}) en Afectacion: {idafectacion}.")
                    logfin= 0
                    reiteracion= 0 if random.randint(0,9)>0.4 else random.randint(1,5)
                    # 
                    self.cursor.execute('''
                        INSERT INTO afectaciones_reclamos (idafectacion, cuenta, fecha, reiteracion, logini, logfin)
                        VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?, ?)
                    ''', (idafectacion,cuenta[0],reiteracion,logini,logfin,))
                    cant+= 0 if cant==None else 1
            # id = self.cursor.lastrowid
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'afectaciones_reclamos'.")
            return cant
        except sqlite3.Error as e:
            self.conn.rollback()
            print(f"Fail: Error al insertar datos en la tabla 'afectaciones_reclamos'. Detalle: {e}")
            return 0
            
    def normaliza_documentos(idafectacion):
        # Recibe por parametro el documento que desea normalizar y normaliza tambien los cts relacionados. 
        None
        
    def normaliza_elementos_aleatorios(idafectacion):
        # Recibe un documento y normaliza aleatoriamente, si queda sin cts normaliza el documento. 
        None
            

# # Ejemplo de uso
# if __name__ == "__main__":
#     db = Datos()          # Crear instancia de la clase
#     ssee= db.random_id_ssee(125)   # Crear la tabla 'clientes'
#     print(ssee)
#     db.cerrar_conexion()        # Cerrar la conexión a la base de datos
