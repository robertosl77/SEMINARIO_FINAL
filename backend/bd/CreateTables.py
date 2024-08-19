import sqlite3
import random
from datetime import datetime

class CreateTables:
    def __init__(self, db_name='sgedatabase.db'):
        # Conectar a la base de datos (o crearla si no existe)
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()

    def crear_tabla_geografico(self):
        try:
            self.cursor.execute('''
                CREATE TABLE IF NOT EXISTS geografico (
                    idlocalidad INTEGER PRIMARY KEY AUTOINCREMENT,
                    region TEXT,
                    localidad TEXT,
                    partido TEXT,
                    sector TEXT
                )
            ''')
            # Truncate Reiniciar el autoincremento
            self.cursor.execute('DELETE FROM geografico')
            # Confirmar los cambios
            self.conn.commit()
            # Confirma
            return True
        except sqlite3.Error as e:
            # Si ocurre un error, devolver un mensaje de fallo
            print(f"Fail: Error al crear la tabla 'geografico'. Detalle: {e}")
            return False        

    def insertar_datos_geografico(self, json):
        if json is None:
            print("No se proporcionaron datos para insertar.")
            return
        
        try:
            # Recorrer cada registro en el JSON y insertar en la tabla
            for entry in json['geografico']:
                self.cursor.execute('''
                    INSERT INTO geografico (region, localidad, partido, sector)
                    VALUES (?, ?, ?, ?)
                ''', (entry['region'], entry['localidad'], entry['partido'], entry['sector']))          
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'geografico'.")
            return True
        except sqlite3.Error as e:
            print(f"Fail: Error al insertar datos en la tabla 'geografico'. Detalle: {e}")
            return False

    def crear_tabla_ssee(self):
        try:
            self.cursor.execute('''
                CREATE TABLE IF NOT EXISTS ssee (
                    idssee INTEGER PRIMARY KEY,
                    ssee TEXT
                )
            ''')
            # Truncate Reiniciar el autoincremento
            self.cursor.execute('DELETE FROM ssee')
            # Confirmar los cambios
            self.conn.commit()
            # Confirma
            return True
        except sqlite3.Error as e:
            # Si ocurre un error, devolver un mensaje de fallo
            print(f"Fail: Error al crear la tabla 'ssee'. Detalle: {e}")
            return False        

    def insertar_datos_ssee(self, json):
        if json is None:
            print("No se proporcionaron datos para insertar.")
            return
        
        try:
            # Recorrer cada registro en el JSON y insertar en la tabla
            for entry in json['ssee']:
                self.cursor.execute('''
                    INSERT INTO ssee (idssee, ssee)
                    VALUES (?, ?)
                ''', (entry['SGE_COD_SSEE'], entry['SGE_NOM_SSEE']))
            
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'ssee'.")
            return True
        except sqlite3.Error as e:
            print(f"Fail: Error al insertar datos en la tabla 'ssee'. Detalle: {e}")
            return False

    def crear_tabla_alim(self):
        try:
            self.cursor.execute('''
                CREATE TABLE IF NOT EXISTS alim (
                    alim INTEGER PRIMARY KEY,
                    idssee INGEGER, 
                    FOREIGN KEY (idssee) REFERENCES ssee(idssee)
                )
            ''')
            # Truncate Reiniciar el autoincremento
            self.cursor.execute('DELETE FROM alim')
            # Confirmar los cambios
            self.conn.commit()
            # Confirma
            return True
        except sqlite3.Error as e:
            # Si ocurre un error, devolver un mensaje de fallo
            print(f"Fail: Error al crear la tabla 'alim'. Detalle: {e}")
            return False        

    def insertar_datos_alim(self, json):
        if json is None:
            print("No se proporcionaron datos para insertar.")
            return
        
        try:
            # Recorrer cada registro en el JSON y insertar en la tabla
            for entry in json['alim']:
                self.cursor.execute('''
                    INSERT INTO alim (alim, idssee)
                    VALUES (?, ?)
                ''', (entry['SGE_COD_ALIM'], entry['SGE_COD_SSEE']))
            
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'alim'.")
            return True
        except sqlite3.Error as e:
            print(f"Fail: Error al insertar datos en la tabla 'alim'. Detalle: {e}")
            return False

    def crear_tabla_ct(self):
        try:
            self.cursor.execute('''
                CREATE TABLE IF NOT EXISTS ct (
                    ct INTEGER PRIMARY KEY,
                    idalim INGEGER, 
                    FOREIGN KEY (idalim) REFERENCES alim(alim)
                )
            ''')
            # Truncate Reiniciar el autoincremento
            self.cursor.execute('DELETE FROM ct')
            # Confirmar los cambios
            self.conn.commit()
            # Confirma
            return True
        except sqlite3.Error as e:
            # Si ocurre un error, devolver un mensaje de fallo
            print(f"Fail: Error al crear la tabla 'ct'. Detalle: {e}")
            return False        

    def insertar_datos_ct(self, json):
        if json is None:
            print("No se proporcionaron datos para insertar.")
            return
        
        try:
            # Recorrer cada registro en el JSON y insertar en la tabla
            for entry in json['ct']:
                ct= entry['SGE_COD_CT']
                alim= entry['SGE_COD_ALIM']
                
                if ct.isdigit() and alim.isdigit():
                    self.cursor.execute('''
                        INSERT INTO ct (ct, idalim)
                        VALUES (?, ?)
                    ''', (ct, alim))
            
                # Confirmar los cambios
                self.conn.commit()
                print("Success: Los datos se han insertado correctamente en la tabla 'ct'.")
            return True
        except sqlite3.Error as e:
            print(f"Fail: Error al insertar datos en la tabla 'ct'. Detalle: {e}")
            return False

    def crear_tabla_log(self):
        try:
            self.cursor.execute('''
                CREATE TABLE IF NOT EXISTS log (
                    idlog INTEGER PRIMARY KEY AUTOINCREMENT,
                    fecha DATE NOT NULL, 
                    descripcion TEXTO
                )
            ''')
            # Confirmar los cambios
            self.conn.commit()
            # Confirma
            return True
        except sqlite3.Error as e:
            # Si ocurre un error, devolver un mensaje de fallo
            print(f"Fail: Error al crear la tabla 'log'. Detalle: {e}")
            return False        

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
            print(f"Fail: Error al insertar datos en la tabla 'ct'. Detalle: {e}")
            return 0

    def crear_tabla_clientes(self):
        try:
            self.cursor.execute('''
                CREATE TABLE IF NOT EXISTS clientes (
                    cuenta INTEGER NOT NULL UNIQUE CHECK(length(cuenta) = 5),  -- Número de 5 dígitos, único, no nulo
                    nombre_cliente TEXT NOT NULL,  -- Nombre del cliente, no nulo, varchar(200)
                    calle TEXT NOT NULL,  -- Calle, no nulo, varchar(50)
                    numero TEXT,  -- Número, varchar(10)
                    piso_dpto TEXT,  -- Piso/Departamento, varchar(7)
                    idlocalidad INTEGER,  -- Llave foránea a la tabla geografico(idlocalidad)
                    ct INTEGER,  -- Llave foránea a la tabla red(id_ct)
                    x REAL,  -- Coordenada X, float/double
                    y REAL,  -- Coordenada Y, float/double
                    edp INTEGER CHECK(edp IN (0, 1)), 
                    logini INTEGER NOT NULL,  -- Fecha de inicio, no nulo
                    logfin INTEGER NOT NULL,  -- Fecha de fin, no nulo
                    FOREIGN KEY (idlocalidad) REFERENCES geografico(idlocalidad),
                    FOREIGN KEY (ct) REFERENCES ct(ct),
                    PRIMARY KEY(cuenta)  -- La cuenta será la clave primaria
                )
            ''')
            # Truncate Reiniciar el autoincremento
            # self.cursor.execute('PRAGMA foreign_keys = OFF;')
            # self.cursor.execute('DELETE FROM clientes;')
            # self.cursor.execute('DELETE FROM sqlite_sequence WHERE name = ''clientes'';')
            # self.cursor.execute('PRAGMA foreign_keys = ON;')
            # Confirmar los cambios
            self.conn.commit()
            # Confirma
            return True
        except sqlite3.Error as e:
            # Si ocurre un error, devolver un mensaje de fallo
            print(f"Fail: Error al crear la tabla 'clientes'. Detalle: {e}")
            return False

    def insertar_datos_clientes(self, json_clientes, json_ct):
        if json_clientes is None:
            print("No se proporcionaron datos para insertar.")
            return
        elif json_ct is None:
            print("No se proporcionaron datos para insertar.")
            return
        
        try:
            for entry in json_clientes['clientes']:
                # Obtiene idlocalidad
                idlocalidad= self.obtiene_idlocalidad(entry['localidad'])
                # Obtiene el CT
                ct= self.obtiene_ct(json_ct, entry.get('ct','0'))
                #
                if idlocalidad == 0:
                    print(f"No se encontró la localidad {entry.get('localidad','')}, omitiendo cuenta {cuenta}.")
                elif ct=='0':
                    print(f"No se encontró el CT {entry.get('ct','0')}, omitiendo cuenta {cuenta}.")
                else:
                    # Crea una cuenta entre secuencial y aleatoria
                    cuenta = (cuenta if 'cuenta' in locals() else 10000) + random.randint(3, 9)
                    # Inserta Logini
                    logini= self.insertar_datos_log(f"Se agrega cliente con cuenta {cuenta}.")
                    # Inserta Logfin (segun random)
                    if random.random() > 0.9:
                        logfin= self.insertar_datos_log(f"Baja del cliente con cuenta {cuenta}.")
                    else:
                        logfin= 0
                    # Inserta nombre de cliente aleatorio
                    nombre_cliente=self.generar_nombre_completo().upper()
                    # Selecciona cliente EDP (aleatorio >60%)
                    # esedp = 1 if random.random() > 0.6 and logfin == 0 else 0
                    # 
                    sql= '''
                        INSERT INTO clientes (cuenta, nombre_cliente, calle, numero, piso_dpto, idlocalidad, ct, x, y, logini, logfin)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    '''
                    self.cursor.execute(sql, (
                        cuenta, 
                        nombre_cliente, 
                        entry['calle'], 
                        entry['numero'], 
                        entry.get('piso_dpto', ''), 
                        idlocalidad, 
                        ct, 
                        entry['x'], 
                        entry['y'], 
                        logini, 
                        logfin))
                    
                
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'clientes'.")
            return True
        except sqlite3.Error as e:
            print(f"Fail: Error al insertar datos en la tabla 'clientes'. Detalle: {e}. cuenta {cuenta}")
            return False

    def obtiene_idlocalidad(self, localidad):
        try:
            # Consultar el idlocalidad según la localidad
            self.cursor.execute('SELECT idlocalidad FROM geografico WHERE localidad = ?', (localidad,))
            result = self.cursor.fetchone()
            if result:
                return result[0]  # Devolver el idlocalidad
            else:
                return None  # Devolver None si no se encuentra la localidad
        except sqlite3.Error as e:
            print(f"Error al buscar idlocalidad: {e}")
            return 0
    
    def obtiene_ct(self, json, ct):
        try:
            # Buscar en el archivo ct.json el EDN_COD_CT que coincide con el ct del cliente
            for entry in json['ct']:
                if entry['EDN_COD_CT'] == ct:
                    return entry['SGE_COD_CT']  # Devolver el SGE_COD_CT correspondiente
            
            # Si no se encuentra el ct, devolver None o algún valor por defecto
            return '0'
        
        except Exception as e:
            print(f"Error al procesar el archivo ct.json: {e}")
            return '0'

    def generar_nombre_completo(self):
        # Lista ampliada de nombres
        nombres = [
            "Juan", "María", "Pedro", "Laura", "Carlos", "Ana", "Luis", "Sofía", "Jorge", "Valentina",
            "Miguel", "Lucía", "Fernando", "Gabriela", "Ricardo", "Daniela", "Roberto", "Elena", "Andrés", "Paula",
            "José", "Carmen", "Raúl", "Martina", "David", "Camila", "Santiago", "Verónica", "Tomás", "Natalia",
            "Pablo", "Beatriz", "Alejandro", "Patricia", "Ramón", "Liliana", "Esteban", "Claudia", "Héctor", "Gloria"
        ]
        
        # Lista ampliada de apellidos
        apellidos = [
            "García", "Rodríguez", "Pérez", "Martínez", "González", "López", "Hernández", "Díaz", "Romero", "Sánchez",
            "Fernández", "Jiménez", "Ruiz", "Moreno", "Álvarez", "Molina", "Ortiz", "Castro", "Vega", "Silva",
            "Torres", "Ramos", "Cruz", "Flores", "Rojas", "Guerrero", "Vargas", "Guzmán", "Reyes", "Mendoza",
            "Ramírez", "Navarro", "Méndez", "Iglesias", "Cabrera", "Rivera", "Castillo", "Paredes", "Suárez", "Herrera"
        ]
        
        # Selección aleatoria de uno o dos nombres
        nombre = random.choice(nombres)
        if random.random() > 0.5:  # 50% de probabilidad de tener un segundo nombre
            nombre += f" {random.choice(nombres)}"
        
        # Selección aleatoria de uno o dos apellidos
        apellido = random.choice(apellidos)
        if random.random() > 0.5:  # 50% de probabilidad de tener un segundo apellido
            apellido += f" {random.choice(apellidos)}"
        
        # Devolver el nombre completo
        return f"{nombre} {apellido}"

    def crear_tabla_pacientes(self):
        try:
            self.cursor.execute('''
                CREATE TABLE IF NOT EXISTS pacientes (
                    idpaciente INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID autonumérico
                    cuenta INTEGER NOT NULL,  -- Número de cuenta, clave foránea de la tabla clientes
                    nombre_paciente TEXT NOT NULL,  -- Nombre del paciente
                    dni INTEGER,  -- DNI del paciente
                    lote INTEGER, -- Lote del ENRE
                    inicio_recs DATE NOT NULL,  -- Fecha de inicio del RECS
                    fin_recs DATE,  -- Fecha de fin del RECS (puede ser NULL si aún no ha finalizado)
                    diagnostico, -- Diagnostico del paciente
                    riesgo, -- Riesgo del paciente ante cortes
                    logini INTEGER NOT NULL,  -- Fecha de inicio del log
                    logfin INTEGER,  -- Fecha de fin del log (puede ser NULL si aún no ha finalizado)
                    FOREIGN KEY (cuenta) REFERENCES clientes(cuenta)  -- Clave foránea a la tabla clientes
                )
            ''')
            # Confirmar los cambios
            self.conn.commit()
            # Confirma
            return True
        except sqlite3.Error as e:
            # Si ocurre un error, devolver un mensaje de fallo
            print(f"Fail: Error al crear la tabla 'pacientes'. Detalle: {e}")
            return False
    
    def insertar_datos_pacientes(self, json_diagnostico, json_riesgo):
        try:
            lote= 1
            # Ejecutar el SELECT a la tabla clientes
            self.cursor.execute('select cuenta, logfin from clientes;')
            # Recorrer los resultados
            for row in self.cursor.fetchall():
                cuenta= row[0]
                paciente= self.generar_nombre_completo()
                dni= random.randint(7000000, 50000000)
                lote+= 1 if random.randint(1,9)>7 else 0
                inicio_recs= datetime.today().strftime('%Y-%m-%d')
                fin_recs= datetime.today().strftime('%Y-%m-%d') if row[1]>0 else ''
                # Diagnóstico aleatorio (solo el texto del diagnóstico)
                diagnostico = random.choice(json_diagnostico['diagnosticos'])['diagnostico']
                # Riesgo aleatorio (solo el texto del riesgo)
                riesgo = random.choice(json_riesgo['riesgos'])['riesgo']
                # Log ini
                logini= self.insertar_datos_log(f"Se registra RECS para la cuenta {cuenta}.")
                # Inserta Logfin (segun random)
                if row[1]>0:
                    logfin= self.insertar_datos_log(f"Se informa baja del RECS para la cuenta {cuenta}.")
                else:
                    logfin= 0
                # 
                sql= '''
                    INSERT INTO pacientes (cuenta, nombre_paciente, dni, lote, inicio_recs, fin_recs, diagnostico, riesgo, logini, logfin)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                '''
                self.cursor.execute(sql, (
                    cuenta, 
                    paciente,
                    dni,
                    lote, 
                    inicio_recs,
                    fin_recs, 
                    diagnostico, 
                    riesgo, 
                    logini, 
                    logfin))
                    
                
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'clientes'.")
            return True                

        except sqlite3.Error as e:
            print(f"Error al realizar el SELECT: {e}")

    def crear_tabla_artefactos(self):
        try:
            self.cursor.execute('''
                CREATE TABLE IF NOT EXISTS artefactos (
                    idartefacto INTEGER PRIMARY KEY AUTOINCREMENT,
                    artefacto TEXT NOT NULL,
                    autonomia INTEGER, 
                    logini INTEGER NOT NULL,
                    logfin INTEGER
                )
            ''')
            # Confirmar los cambios
            self.conn.commit()
            # Confirma
            return True
        except sqlite3.Error as e:
            # Si ocurre un error, devolver un mensaje de fallo
            print(f"Fail: Error al crear la tabla 'artefactos'. Detalle: {e}")
            return False
    
    def insertar_datos_artefactos(self, json_artefactos):
        try:
            for artefacto in json_artefactos['artefactos']:
                logini= self.insertar_datos_log(f"Se registra Artefacto {artefacto['artefacto']}.")
                logfin= 0
                # 
                sql= '''
                    INSERT INTO artefactos (artefacto, autonomia, logini, logfin)
                    VALUES (?, ?, ?, ?)
                '''
                self.cursor.execute(sql, (
                    artefacto['artefacto'], 
                    artefacto.get('autonomia','0'),
                    logini, 
                    logfin))
                    
                
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'artefactos'.")
            return True                

        except sqlite3.Error as e:
            print(f"Error al realizar el SELECT: {e}")
        
    def crear_tabla_cliente_artefactos(self):
        try:
            self.cursor.execute('''
                CREATE TABLE IF NOT EXISTS clientes_artefactos (
                    idclienteartefacto INTEGER PRIMARY KEY AUTOINCREMENT,
                    idartefacto INTEGER NOT NULL,
                    cuenta INTEGER NOT NULL CHECK(length(cuenta) = 5),  -- Número de 5 dígitos, único, no nulo 
                    logini INTEGER NOT NULL,
                    logfin INTEGER,
                    FOREIGN KEY (cuenta) REFERENCES clientes(cuenta),
                    FOREIGN KEY (idartefacto) REFERENCES artefactos(idartefacto)
                )
            ''')
            # Confirmar los cambios
            self.conn.commit()
            # Confirma
            return True
        except sqlite3.Error as e:
            # Si ocurre un error, devolver un mensaje de fallo
            print(f"Fail: Error al crear la tabla 'clientes_artefactos'. Detalle: {e}")
            return False
    
    def insertar_datos_cliente_artefactos(self, json_artefactos):
        try:
            # Ejecutar el SELECT a la tabla clientes
            self.cursor.execute('select cuenta, logfin from clientes;')
            # Recorrer los resultados
            for row in self.cursor.fetchall():
                cuenta= row[0]
                cant_artefactos= random.randint(0, 5)
                numeros_guardados = set()
                # 
                for _ in range(cant_artefactos):
                    idartefacto = random.choice(json_artefactos['artefactos'])['id']
                    if idartefacto not in numeros_guardados: 
                        # Guardo el numero de artefacto para que no vuelva a salir repetido
                        numeros_guardados.add(idartefacto)
                        # Logs
                        logini= self.insertar_datos_log(f"Se vincula Artefacto con cliente de cuenta {cuenta}.")
                        if row[1]>0:
                            logini= self.insertar_datos_log(f"Se desvincula Artefacto con cliente de cuenta {cuenta}.")
                        else:
                            logfin= 0
                        # 
                        sql= '''
                            INSERT INTO clientes_artefactos (idartefacto, cuenta, logini, logfin)
                            VALUES (?, ?, ?, ?)
                        '''
                        self.cursor.execute(sql, (
                            idartefacto, 
                            cuenta,
                            logini, 
                            logfin))
                    
                
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'clientes_artefactos'.")
            return True                

        except sqlite3.Error as e:
            print(f"Error al realizar el SELECT: {e}")

    def crear_tabla_telefonos(self):
        try:
            self.cursor.execute('''
                CREATE TABLE IF NOT EXISTS telefonos (
                    idtelefono INTEGER PRIMARY KEY AUTOINCREMENT,
                    cuenta INTEGER NOT NULL CHECK(length(cuenta) = 5),  -- Número de 5 dígitos, único, no nulo 
                    telefono TEXTO NOT NULL, 
                    tipo TEXTO NOT NULL, 
                    logini INTEGER NOT NULL,
                    logfin INTEGER,
                    FOREIGN KEY (cuenta) REFERENCES clientes(cuenta)
                )
            ''')
            # Confirmar los cambios
            self.conn.commit()
            # Confirma
            return True
        except sqlite3.Error as e:
            # Si ocurre un error, devolver un mensaje de fallo
            print(f"Fail: Error al crear la tabla 'telefonos'. Detalle: {e}")
            return False
    
    def insertar_datos_telefonos(self):
        try:
            # Ejecutar el SELECT a la tabla clientes
            self.cursor.execute('select cuenta, logfin from clientes;')
            # Recorrer los resultados
            for row in self.cursor.fetchall():
                cuenta= row[0]
                cant_artefactos= random.randint(0, 3)
                # 
                for _ in range(cant_artefactos):
                    telefono = f"{random.randint(4000, 4999)}-{random.randint(1000, 9999)}"
                    tipo= "LINEA"
                    if random.choice([True, False]):
                        telefono= f"11-{telefono}"
                        tipo= "CELULAR"
                    # Logs
                    logini= self.insertar_datos_log(f"Se vincula telefono {telefono} a la cuenta {cuenta}.")
                    if row[1]>0:
                        logini= self.insertar_datos_log(f"Se desvincula telefono {telefono} a la cuenta {cuenta}.")
                    else:
                        logfin= 0
                    # 
                    sql= '''
                        INSERT INTO telefonos (cuenta, telefono, tipo, logini, logfin)
                        VALUES (?, ?, ?, ?, ?)
                    '''
                    self.cursor.execute(sql, (
                        cuenta,
                        telefono, 
                        tipo, 
                        logini, 
                        logfin))
                    
                
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'telefonos'.")
            return True                

        except sqlite3.Error as e:
            print(f"Error al realizar el SELECT: {e}")

    
    def cerrar_conexion(self):
        # Cerrar la conexión a la base de datos
        self.conn.close()

# Ejemplo de uso
# if __name__ == "__main__":
#     db = CreateTables()          # Crear instancia de la clase
#     db.crear_tabla_clientes()   # Crear la tabla 'clientes'
#     db.cerrar_conexion()        # Cerrar la conexión a la base de datos
