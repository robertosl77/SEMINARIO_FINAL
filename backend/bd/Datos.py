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
            cts= self.cursor.execute('SELECT ct.ct FROM ssee, alim, ct WHERE ssee.idssee=alim.idssee AND alim.alim=ct.alim AND ct.ct in (select ct from clientes where logfin=0) AND ssee.idssee = ? ;',(ssee,)).fetchall()
            return cts
        except sqlite3.Error as e:        
            print(f"Error al obtener subestación: {e}")
            return []
        finally:
            self.cursor.close

    def obtiene_cts_aleatorios(self):
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
        try:
            cts= self.cursor.execute('select ct from afectaciones_elementos where logfin=0 and (ABS(RANDOM()) % 10)>=7;').fetchall()
            return cts
        except sqlite3.Error as e:        
            print(f"Error al obtener subestación: {e}")
            return []
        finally:
            self.cursor.close

    def obtiene_cts_from_afectacion(self, idafectacion):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            cts= self.cursor.execute('SELECT ct FROM afectaciones_elementos WHERE logfin=0 AND idafectacion= ?',(idafectacion,)).fetchall()
            return cts
        except sqlite3.Error as e:        
            print(f"Error al obtener cts: {e}")
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
            # print("Success: Los datos se han insertado correctamente en la tabla 'log'.")
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
                            UPDATE afectaciones_reclamos SET logfin= ?, fecha_sysdate=CURRENT_TIMESTAMP WHERE idafectacion = ? AND cuenta in (select cuenta from clientes where logfin=0 and ct= ?)
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

    def normalizar_sinctsafectados(self):
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
                cant+= 1
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'nueva_afectacion_elementos'.")
            return cant
        except sqlite3.Error as e:
            self.conn.rollback()
            print(f"Fail: Error al insertar datos en la tabla 'nueva_afectacion_elementos'. Detalle: {e}")
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
                        INSERT INTO afectaciones_afectados (idafectacion, ct, cuenta, gestion, logini, logfin)
                        VALUES (?, ?, ?, ?, ?, ?)
                    ''', (idafectacion,ct[0],cuenta[0],'NUEVO',logini,logfin,))
                    cant+= 1
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
            cantr=0
            cuentas= self.cursor.execute('select cuenta from afectaciones_afectados where idafectacion = ?',(idafectacion,)).fetchall()
            for cuenta in cuentas:
                if random.random()>0.7:
                    logini= self.insertar_datos_log(f"Nuevo Reclamo de la cuenta ({cuenta[0]}) en Afectacion: {idafectacion}.")
                    logfin= 0
                    reiteracion= 0 if random.random()>0.4 else random.randint(1,5)
                    if reiteracion>0:
                        cantr+=1
                    # 
                    self.cursor.execute('''
                        INSERT INTO afectaciones_reclamos (idafectacion, cuenta, fecha, fecha_sysdate, reiteracion, logini, logfin)
                        VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?, ?)
                    ''', (idafectacion,cuenta[0],reiteracion,logini,logfin,))
                    cant+= 1
            # id = self.cursor.lastrowid
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'afectaciones_reclamos'.")
            return [cant,cantr]
        except sqlite3.Error as e:
            self.conn.rollback()
            print(f"Fail: Error al insertar datos en la tabla 'afectaciones_reclamos'. Detalle: {e}")
            return [0,0]

    def reclamos_reiteraciones(self):
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
        try:
            afectaciones= self.cursor.execute('select a.idafectacion from afectaciones a where a.restitucion is null and (select count(1) from afectaciones_elementos where idafectacion=a.idafectacion and restitucion is null)>0;').fetchall()
            for afectacion in afectaciones:
                self.nueva_afectacion_reclamos(afectacion[0])
        except sqlite3.Error as e:        
            print(f"Error al obtener afectaciones activas: {e}")
        finally:
            self.cursor.close

    def cambia_gestion(self, cuenta,idafectacion, nueva_solucion):
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()        
        try:
            self.insertar_datos_log(f"Se gestiono la cuenta {cuenta}, de la afectacion {idafectacion}, como {nueva_solucion}.")
            self.cursor.execute('''
                UPDATE afectaciones_afectados 
                SET gestion= ?
                WHERE idafectacion= ?
                AND cuenta= ?
            ''', (nueva_solucion, idafectacion, cuenta, ))
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Se modifico la gestion en la tabla 'afectaciones_afectados'.")
            return True
        except sqlite3.Error as e:
            self.conn.rollback()
            print(f"Fail: Error al actualizar la gestion en la tabla 'afectaciones_afectados'. Detalle: {e}")
            return False         
            
    def agrega_nota(self, cuenta,idafectacion,usuario,nota):
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()        
        try:
            logini=self.insertar_datos_log(f"Se inserto nota en la cuenta {cuenta}.")
            logfin=0
            self.cursor.execute('''
                INSERT INTO afectaciones_contactos 
                (idafectacion,cuenta,usuario,fechahora,observaciones,logini,logfin)
                VALUES ( ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?)
            ''', (idafectacion, cuenta, usuario, nota, logini, logfin, ))
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Se modifico la gestion en la tabla 'afectaciones_contactos'.")
            return True
        except sqlite3.Error as e:
            self.conn.rollback()
            print(f"Fail: Error al actualizar la gestion en la tabla 'afectaciones_contactos'. Detalle: {e}")
            return False         
            
    def agrega_contacto(self, cuenta,idafectacion,usuario,contacto,idtelefono,efectivo):
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()        
        try:
            logini=self.insertar_datos_log(f"Se inserto nota en la cuenta {cuenta}.")
            logfin=0
            self.cursor.execute('''
                INSERT INTO afectaciones_contactos 
                (idafectacion,cuenta,usuario,fechahora,observaciones,idtelefono,efectivo,logini,logfin)
                VALUES ( ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?)
            ''', (idafectacion, cuenta, usuario, contacto, idtelefono, efectivo, logini, logfin, ))
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Se modifico la gestion en la tabla 'afectaciones_contactos'.")
            return True
        except sqlite3.Error as e:
            self.conn.rollback()
            print(f"Fail: Error al actualizar la gestion en la tabla 'afectaciones_contactos'. Detalle: {e}")
            return False         

    def obtiene_clientes(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            clientes= self.cursor.execute('''
                SELECT * FROM (
                SELECT 
                    c.cuenta,
                    c.nombre_cliente,
                    c.calle,
                    c.numero,
                    c.piso_dpto,
                    g.localidad,
                    g.partido,
                    c.ct,
                    al.alim,
                    se.ssee,
                    c.x,
                    c.y,
                    (SELECT fecha FROM log WHERE idlog = c.logini) AS fecha_in_sistema,
                    (SELECT fecha FROM log WHERE idlog = c.logfin) AS fecha_out_sistema,
                    p.inicio_recs,
                    p.fin_recs,
                    CASE 
                        WHEN p.fin_recs <> '' THEN 100
                    ELSE CAST(ROUND(((julianday('now') - julianday(p.inicio_recs)) / 730) * 100) AS INTEGER)
                    END AS vigencia
                FROM 
                    clientes c
                    LEFT JOIN geografico g ON c.idlocalidad = g.idlocalidad
                    LEFT JOIN ct ct ON c.ct = ct.ct
                    LEFT JOIN alim al ON ct.alim = al.alim
                    LEFT JOIN ssee se ON al.idssee = se.idssee
                    LEFT JOIN clientes_pacientes p ON c.cuenta = p.cuenta  -- Reemplazo del (+) por LEFT JOIN
                )
                ORDER BY 
                fin_recs,
                vigencia DESC
            ''').fetchall()
            return clientes
        except sqlite3.Error as e:        
            print(f"Error al obtener los clientes: {e}")
            return []
        finally:
            self.cursor.close            

# # Ejemplo de uso
# if __name__ == "__main__":
#     db = Datos()          # Crear instancia de la clase
#     ssee= db.random_id_ssee(125)   # Crear la tabla 'clientes'
#     print(ssee)
#     db.cerrar_conexion()        # Cerrar la conexión a la base de datos
