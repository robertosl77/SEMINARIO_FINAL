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
				, (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0) fae
				, (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0) ami
				, (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0) ge_propio
                , (select count(1) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion) reclamos
                , ifnull((select sum(reiteracion) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion),0) reiteraciones
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and e.logfin=0 and af.logfin=0  
                order by a.idafectacion
                ;                                         
            ''').fetchall()
            return afectados
        except sqlite3.Error as e:        
            print(f"Error al obtener cuentas afectadas: {e}")
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
				, (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0) fae
				, (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0) ami
				, (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0) ge_propio
                , (select count(1) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion) reclamos
                , ifnull((select sum(reiteracion) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion),0) reiteraciones
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and e.logfin<>0 and af.logfin=0
                order by a.idafectacion
            ''').fetchall()
            return afectados
        except sqlite3.Error as e:        
            print(f"Error al obtener cuentas normalizadas: {e}")
            return []
        finally:
            self.cursor.close

    def tarjeta_reclamos(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            reclamos= self.cursor.execute('''
                SELECT a.idafectacion, a.afectacion, a.tipo, a.estado, e.ct, e.inicio, e.restitucion, af.cuenta, af.gestion 
				, (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0) fae
				, (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0) ami
				, (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0) ge_propio
                , (select count(1) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion) reclamos
                , ifnull((select sum(reiteracion) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion),0) reiteraciones
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e, afectaciones_reclamos r
                where a.idafectacion=af.idafectacion 
				and af.idafectacion=e.idafectacion 
				and af.ct=e.ct 
				and af.cuenta=r.cuenta 
				and a.idafectacion=r.idafectacion 
				and e.logfin=0 
				and af.logfin=0 
				and r.logfin=0
                order by a.idafectacion
                ;
            ''').fetchall()
            return reclamos
        except sqlite3.Error as e:        
            print(f"Error al obtener cuentas con reclamos: {e}")
            return []
        finally:
            self.cursor.close

    def tarjeta_reiteracion(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            reiteracion= self.cursor.execute('''
                SELECT a.idafectacion, a.afectacion, a.tipo, a.estado, e.ct, e.inicio, e.restitucion, af.cuenta, af.gestion 
				, (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0) fae
				, (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0) ami
				, (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0) ge_propio
                , (select count(1) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion) reclamos
                , ifnull((select sum(reiteracion) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion),0) reiteraciones
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e, afectaciones_reclamos r
                where a.idafectacion=af.idafectacion 
				and af.idafectacion=e.idafectacion 
				and af.ct=e.ct 
				and af.cuenta=r.cuenta 
				and a.idafectacion=r.idafectacion 
				and e.logfin=0 
				and af.logfin=0 
				and r.logfin=0
                and r.reiteracion>0
                order by a.idafectacion
                ;
            ''').fetchall()
            return reiteracion
        except sqlite3.Error as e:        
            print(f"Error al obtener cuentas con reiteracion: {e}")
            return []
        finally:
            self.cursor.close

    def tarjeta_duracion(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            duracion= self.cursor.execute('''
                SELECT a.idafectacion, a.afectacion, a.tipo, a.estado, e.ct, e.inicio, e.restitucion, af.cuenta, af.gestion
				, (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0) fae
				, (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0) ami
				, (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0) ge_propio
                , (select count(1) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion) reclamos
                , ifnull((select sum(reiteracion) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion),0) reiteraciones
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and e.logfin=0 and af.logfin=0
                and CAST((julianday('now') - julianday(e.inicio)) * 24 AS INTEGER) > 4
                order by a.idafectacion
                ;
            ''').fetchall()
            return duracion
        except sqlite3.Error as e:        
            print(f"Error al obtener cuentas con duracion excedida: {e}")
            return []
        finally:
            self.cursor.close

    def tarjeta_sinautonomia(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            sinautonomia= self.cursor.execute('''
                SELECT a.idafectacion, a.afectacion, a.tipo, a.estado, e.ct, e.inicio, e.restitucion, af.cuenta, af.gestion
				, (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0) fae
				, (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0) ami
				, (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0) ge_propio
                , (select count(1) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion) reclamos
                , ifnull((select sum(reiteracion) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion),0) reiteraciones
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and e.logfin=0 and af.logfin=0
                and CAST((julianday('now') - julianday(e.inicio)) * 24 AS INTEGER) > ifnull((select min(autonomia) from clientes_artefactos ca, artefactos a where ca.idartefacto=a.idartefacto and ca.cuenta=af.cuenta),0)
                order by a.idafectacion
                ;
            ''').fetchall()
            return sinautonomia
        except sqlite3.Error as e:        
            print(f"Error al obtener cuentas sin autonomia: {e}")
            return []
        finally:
            self.cursor.close

    def tarjeta_sincontacto(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            sincontacto= self.cursor.execute('''
                SELECT a.idafectacion, a.afectacion, a.tipo, a.estado, e.ct, e.inicio, e.restitucion, af.cuenta, af.gestion
				, (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0) fae
				, (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0) ami
				, (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0) ge_propio
                , (select count(1) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion) reclamos
                , ifnull((select sum(reiteracion) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion),0) reiteraciones
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and e.logfin=0 and af.logfin=0
                and (select count(1) from afectaciones_contactos where cuenta=af.cuenta and idafectacion=af.idafectacion)=0
                order by a.idafectacion
                ;
            ''').fetchall()
            return sincontacto
        except sqlite3.Error as e:        
            print(f"Error al obtener cuentas sin contacto: {e}")
            return []
        finally:
            self.cursor.close

    def tarjeta_fae(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            fae= self.cursor.execute('''
                SELECT a.idafectacion, a.afectacion, a.tipo, a.estado, e.ct, e.inicio, e.restitucion, af.cuenta, af.gestion
				, (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0) fae
				, (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0) ami
				, (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0) ge_propio
                , (select count(1) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion) reclamos
                , ifnull((select sum(reiteracion) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion),0) reiteraciones
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e, clientes c
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and af.cuenta=c.cuenta
                and e.logfin=0 and af.logfin=0
                and (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0)=1
                order by a.idafectacion
                ;
            ''').fetchall()
            return fae
        except sqlite3.Error as e:        
            print(f"Error al obtener cuentas con fae: {e}")
            return []
        finally:
            self.cursor.close

    def tarjeta_ami(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            ami= self.cursor.execute('''
                SELECT a.idafectacion, a.afectacion, a.tipo, a.estado, e.ct, e.inicio, e.restitucion, af.cuenta, af.gestion
				, (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0) fae
				, (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0) ami
				, (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0) ge_propio
                , (select count(1) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion) reclamos
                , ifnull((select sum(reiteracion) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion),0) reiteraciones
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e, clientes c
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and af.cuenta=c.cuenta
                and e.logfin=0 and af.logfin=0
                and (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0)=1
                order by a.idafectacion
                ;
            ''').fetchall()
            return ami
        except sqlite3.Error as e:        
            print(f"Error al obtener cuentas con ami: {e}")
            return []
        finally:
            self.cursor.close

    def tarjeta_ge(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            ge= self.cursor.execute('''
                SELECT a.idafectacion, a.afectacion, a.tipo, a.estado, e.ct, e.inicio, e.restitucion, af.cuenta, af.gestion
				, (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0) fae
				, (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0) ami
				, (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0) ge_propio
                , (select count(1) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion) reclamos
                , ifnull((select sum(reiteracion) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion),0) reiteraciones
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct
                and e.logfin=0 and af.logfin=0
                and (gestion in ('REQUIERE GE','GE INSTALADO') or (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0)=1)
                order by a.idafectacion
                ;
            ''').fetchall()
            return ge
        except sqlite3.Error as e:        
            print(f"Error al obtener cuentas gestionadas con GE: {e}")
            return []
        finally:
            self.cursor.close

    def tarjeta_seguimiento(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            seguimiento= self.cursor.execute('''
                SELECT a.idafectacion, a.afectacion, a.tipo, a.estado, e.ct, e.inicio, e.restitucion, af.cuenta, af.gestion
				, (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0) fae
				, (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0) ami
				, (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0) ge_propio
                , (select count(1) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion) reclamos
                , ifnull((select sum(reiteracion) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion),0) reiteraciones
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct
                and e.logfin=0 and af.logfin=0
                and gestion in ('SEGUIMIENTO','RELLAMAR','REQUIERE GE')
                order by a.idafectacion
                ;
            ''').fetchall()
            return seguimiento
        except sqlite3.Error as e:        
            print(f"Error al obtener cuentas gestionadas con Seguimiento, Rellamar o Requiere GE: {e}")
            return []
        finally:
            self.cursor.close

    def tarjeta_todos(self):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            todos= self.cursor.execute('''
                SELECT a.idafectacion, a.afectacion, a.tipo, a.estado, e.ct, e.inicio, e.restitucion, af.cuenta, af.gestion 
				, (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0) fae
				, (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0) ami
				, (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0) ge_propio
                , (select count(1) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion) reclamos
                , ifnull((select sum(reiteracion) from afectaciones_reclamos where cuenta=af.cuenta and idafectacion=a.idafectacion),0) reiteraciones
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and af.logfin=0  
                order by a.idafectacion
                ;                                         
            ''').fetchall()
            return todos
        except sqlite3.Error as e:        
            print(f"Error al obtener cuentas todos los clientes reportables: {e}")
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
            telefonos= self.cursor.execute('''
                select 
                    t.idtelefono, 
                    t.cuenta, 
                    t.telefono, 
                    t.tipo, 
                    (select count(1) from afectaciones_contactos where logfin=0 and idtelefono=t.idtelefono) llamadas, 
                    (select count(1) from afectaciones_contactos where logfin=0 and efectivo=1 and idtelefono=t.idtelefono) efectivas 
                from clientes_telefonos t 
                where logfin=0 and cuenta= ?
                Order by
                    (select count(1) from afectaciones_contactos where logfin=0 and efectivo=1 and idtelefono=t.idtelefono)/(select count(1) from afectaciones_contactos where logfin=0 and idtelefono=t.idtelefono) desc
                ;
            ''',(cuenta,)).fetchall()
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
                    END AS hoy, 
                    'R-' || strftime('%Y', fecha) || '-' || strftime('%m', fecha) || '-' || idreclamo AS nro_reclamo
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
                select 
                    ac.idcontacto
                    , ac.cuenta
                    , ac.usuario
                    , ac.fechahora
                    , ac.observaciones
                    , ac.idtelefono
                    , ac.efectivo
                    , ct.telefono
                    , ct.tipo 
                from 
                    afectaciones_contactos ac left join clientes_telefonos ct on ac.idtelefono=ct.idtelefono
                where 
                    (ac.logfin=0 or ac.logfin is null)
                    and (ct.logfin=0 or ct.logfin is null)
                    and ac.cuenta= ?;
            ''', (cuenta,)).fetchall()

            return contactos
        except sqlite3.Error as e:        
            print(f"Error al obtener los contactos: {e}")
            return []
        finally:
            self.cursor.close

    def obtiene_afectaciones(self, cuenta):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            afectacion = self.cursor.execute('''
                select idafectacion, afectacion, tipo, estado, inicio, restitucion from afectaciones where idafectacion in (select idafectacion from afectaciones_afectados where cuenta= ?);
            ''', (cuenta,)).fetchall()

            return afectacion
        except sqlite3.Error as e:        
            print(f"Error al obtener los afectacion: {e}")
            return []
        finally:
            self.cursor.close

    def obtiene_pacientes(self, cuenta):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            pacientes = self.cursor.execute('''
                select idpaciente, cuenta, nombre_paciente, dni, lote, inicio_recs, fin_recs, diagnostico, riesgo from clientes_pacientes where cuenta= ?;
            ''', (cuenta,)).fetchall()

            return pacientes
        except sqlite3.Error as e:        
            print(f"Error al obtener los pacientes: {e}")
            return []
        finally:
            self.cursor.close

    def obtiene_cliente(self, cuenta):      
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()          
        try:
            # Ejecutar la consulta para obtener el resultado
            cliente = self.cursor.execute('''
                select c.cuenta, c.nombre_cliente, c.calle, c.numero, c.piso_dpto, 
                g.idlocalidad, g.region, g.localidad, g.partido, g.sector, 
                c.ct, c.x, c.y
                from clientes c, geografico g
                where c.idlocalidad=g.idlocalidad
                and c.logfin=0
                and c.cuenta= ?
                ;
            ''', (cuenta,)).fetchall()

            return cliente
        except sqlite3.Error as e:        
            print(f"Error al obtener el cliente: {e}")
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
            # Reclamos
            tarjeta = self.cursor.execute('''
                SELECT count(1)
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e, afectaciones_reclamos r
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and af.cuenta=r.cuenta and a.idafectacion=r.idafectacion and e.logfin=0 and af.logfin=0 and r.logfin=0;
            ''').fetchone()
            dashboard.append(tarjeta[0])
            # Clientes con Reiteraciones
            tarjeta = self.cursor.execute(''' 
                SELECT count(1)
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e, afectaciones_reclamos r
                where a.idafectacion=af.idafectacion 
				and af.idafectacion=e.idafectacion 
				and af.ct=e.ct 
				and af.cuenta=r.cuenta 
				and a.idafectacion=r.idafectacion 
				and e.logfin=0 
				and af.logfin=0 
				and r.logfin=0
                and r.reiteracion>0
                ; 
            ''').fetchone()
            dashboard.append(tarjeta[0])   
            # Duracion
            tarjeta = self.cursor.execute(''' 
                SELECT count(1) 
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and e.logfin=0 and af.logfin=0
                and CAST((julianday('now') - julianday(e.inicio)) * 24 AS INTEGER) > 4
                ;
            ''').fetchone()
            dashboard.append(tarjeta[0])               
            # Sin Autonomia
            tarjeta = self.cursor.execute('''
                SELECT count(1)
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and e.logfin=0 and af.logfin=0
                and CAST((julianday('now') - julianday(e.inicio)) * 24 AS INTEGER) > ifnull((select min(autonomia) from clientes_artefactos ca, artefactos a where ca.idartefacto=a.idartefacto and ca.cuenta=af.cuenta),0)
                ;
            ''').fetchone()
            dashboard.append(tarjeta[0])
            # Sin Contacto
            tarjeta = self.cursor.execute(''' 
                SELECT count(1)
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and e.logfin=0 and af.logfin=0
                and (select count(1) from afectaciones_contactos where cuenta=af.cuenta and idafectacion=af.idafectacion)=0
                ;
            ''').fetchone()
            dashboard.append(tarjeta[0])            
            # Con FAE
            tarjeta = self.cursor.execute(''' 
                SELECT count(1)
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e, clientes c
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and af.cuenta=c.cuenta
                and e.logfin=0 and af.logfin=0
                and (select count(1) from clientes_marcas where idmarca=6 and cuenta=af.cuenta and logfin=0)=1
                ;
            ''').fetchone()
            dashboard.append(tarjeta[0])                        
            # Con AMI
            tarjeta = self.cursor.execute(''' 
                SELECT count(1)
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e, clientes c
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct and af.cuenta=c.cuenta
                and e.logfin=0 and af.logfin=0
                and (select count(1) from clientes_marcas where idmarca=10 and cuenta=af.cuenta and logfin=0)=1
                ;
            ''').fetchone()
            dashboard.append(tarjeta[0])                  
            # Gestionado con GE
            tarjeta = self.cursor.execute(''' 
                SELECT count(1)
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct
                and e.logfin=0 and af.logfin=0
                and (gestion in ('REQUIERE GE','GE INSTALADO') or (select count(1) from clientes_marcas where idmarca=5 and cuenta=af.cuenta and logfin=0)=1)
                ;
            ''').fetchone()
            dashboard.append(tarjeta[0])                  
            # Gestionado con SEGUIMIENTO/RELLAMAR
            tarjeta = self.cursor.execute(''' 
                SELECT count(1)
                FROM afectaciones a, afectaciones_afectados af, afectaciones_elementos e
                where a.idafectacion=af.idafectacion and af.idafectacion=e.idafectacion and af.ct=e.ct
                and e.logfin=0 and af.logfin=0
                and gestion in ('SEGUIMIENTO','RELLAMAR','REQUIERE GE')
                ;
            ''').fetchone()
            dashboard.append(tarjeta[0])
            # 
            return dashboard
        except sqlite3.Error as e:        
            print(f"Error al obtener las estadisticas del dashboard: {e}")
            return []
        finally:
            self.cursor.close


