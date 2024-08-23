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
            afectados= self.cursor.execute('SELECT * FROM afectaciones_afectados where logfin=0').fetchall()
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
            afectados= self.cursor.execute('SELECT a.*, e.ct, e.logfin FROM afectaciones_afectados a, afectaciones_elementos e, clientes c where a.idafectacion=e.idafectacion and a.cuenta=c.cuenta and c.ct=e.ct and a.logfin=0 and e.logfin<>0;').fetchall()
            return afectados
        except sqlite3.Error as e:        
            print(f"Error al obtener subestación: {e}")
            return []
        finally:
            self.cursor.close