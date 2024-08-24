import sqlite3

class Tarjetas:
    def __init__(self, db_name='sgedatabase.db'):
        # Conectar a la base de datos (o crearla si no existe)
        self.db_name= db_name
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()

    def tarjeta_afectados(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            afectados= self.cursor.execute('''
                SELECT a.idafectacion, a.afectacion, a.tipo, a.estado, e.ct, e.inicio, e.restitucion, af.cuenta, af.gestion 
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and e.logfin=0 and af.logfin=0                                           
            ''').fetchall()
            return afectados
        except sqlite3.Error as e:        
            print(f"Error al obtener subestación: {e}")
            return []
        finally:
            self.cursor.close

    def tarjeta_normalizados(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            afectados= self.cursor.execute('''
                SELECT a.idafectacion, a.afectacion, a.tipo, a.estado, e.ct, e.inicio, e.restitucion, af.cuenta, af.gestion 
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and e.logfin<>0 and af.logfin=0
            ''').fetchall()
            return afectados
        except sqlite3.Error as e:        
            print(f"Error al obtener subestación: {e}")
            return []
        finally:
            self.cursor.close

    def obtiene_marcas(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            marcas = self.cursor.execute('select idmarca, marca, submarca from marcas;').fetchall()
            return marcas
        except sqlite3.Error as e:        
            print(f"Error al obtener las marcas: {e}")
            return []
        finally:
            self.cursor.close

    def obtiene_dashboard(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        dashboard= []
        try:
            # Afectados
            tarjeta = self.cursor.execute('''
                SELECT count(1)
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and e.logfin=0 and af.logfin=0
                ;                                              
            ''').fetchone()
            dashboard.append(tarjeta[0])
            # Normalizados
            tarjeta = self.cursor.execute('''
                SELECT count(1)
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and e.logfin<>0 and af.logfin=0
                ;                                              
            ''').fetchone()
            dashboard.append(tarjeta[0])
            return dashboard
        except sqlite3.Error as e:        
            print(f"Error al obtener las estadisticas del dashboard: {e}")
            return []
        finally:
            self.cursor.close

    def obtiene_marcas_clientes(self, cuenta):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
        try:
            # Ejecutar la consulta para obtener el resultado
            marcas = self.cursor.execute('''
                SELECT c.idclientemarca, c.cuenta, m.idmarca, m.marca, m.submarca 
                FROM clientes_marcas c, marcas m 
                WHERE c.idmarca = m.idmarca AND c.logfin = 0 AND c.cuenta = ? 
                ORDER BY m.marca, m.submarca;
            ''', (cuenta,)).fetchall()
            return marcas
        except sqlite3.Error as e:        
            print(f"Error al obtener las marcas del cliente: {e}")
            return []
        finally:
            self.cursor.close()  # Asegúrate de cerrar el cursor correctamente
            self.conn.close()    # También cierra la conexión a la base de datos

    def obtiene_aparatologia(self, cuenta):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            aparatologia= self.cursor.execute('select a.idartefacto, a.artefacto, a.autonomia from clientes_artefactos ca, artefactos a where ca.idartefacto=a.idartefacto and cuenta= ? and ca.logfin=0 and a.logfin=0;',(cuenta,)).fetchall()
            return aparatologia
        except sqlite3.Error as e:        
            print(f"Error al obtener la aparatologia: {e}")
            return []
        finally:
            self.cursor.close

    def obtiene_telefonos(self, cuenta):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            telefonos= self.cursor.execute('select t.idtelefono, t.cuenta, t.telefono, t.tipo, (select count(1) from afectaciones_contactos where logfin=0 and idtelefono=t.idtelefono) llamadas, (select count(1) from afectaciones_contactos where logfin=0 and efectivo=1 and idtelefono=t.idtelefono) efectivas from clientes_telefonos t where logfin=0 and cuenta= ?;',(cuenta,)).fetchall()
            return telefonos
        except sqlite3.Error as e:        
            print(f"Error al obtener los telefonos: {e}")
            return []
        finally:
            self.cursor.close

    def obtiene_reclamos(self, cuenta):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            reclamos = self.cursor.execute('''
                SELECT 
                    idreclamo, 
                    idafectacion, 
                    cuenta, 
                    fecha, 
                    reiteracion, 
                    CASE 
                        WHEN logfin <> 0 THEN 'CERRADO' 
                        ELSE 'ABIERTO' 
                    END AS estado, 
                    CASE 
                        WHEN date(fecha) = date('now') THEN 1 
                        ELSE 0 
                    END AS hoy 
                FROM afectaciones_reclamos 
                WHERE cuenta = ?;
            ''', (cuenta,)).fetchall()

            return reclamos
        except sqlite3.Error as e:        
            print(f"Error al obtener los reclamos: {e}")
            return []
        finally:
            self.cursor.close

    def obtiene_contactos(self, cuenta):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            contactos = self.cursor.execute('''
                select ac.idcontacto, ac.cuenta, ac.usuario, ac.fechahora, ac.observaciones, ac.idtelefono, ac.efectivo, ct.telefono, ct.tipo 
                from afectaciones_contactos ac, clientes_telefonos ct 
                where ac.idtelefono=ct.idtelefono and ac.logfin=0 and ct.logfin=0 and ac.cuenta= ?;
            ''', (cuenta,)).fetchall()

            return contactos
        except sqlite3.Error as e:        
            print(f"Error al obtener los contactos: {e}")
            return []
        finally:
            self.cursor.close


