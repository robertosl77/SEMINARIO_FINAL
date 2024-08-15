import sqlite3

class CreateTables:
    def __init__(self, db_name='sgedatabase.db'):
        # Conectar a la base de datos (o crearla si no existe)
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()

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
                    idct INTEGER,  -- Llave foránea a la tabla red(id_ct)
                    x REAL,  -- Coordenada X, float/double
                    y REAL,  -- Coordenada Y, float/double
                    logini DATE NOT NULL,  -- Fecha de inicio, no nulo
                    logfin DATE NOT NULL,  -- Fecha de fin, no nulo
                    FOREIGN KEY (idlocalidad) REFERENCES geografico(idlocalidad),
                    FOREIGN KEY (idct) REFERENCES red(id_ct),
                    PRIMARY KEY(cuenta)  -- La cuenta será la clave primaria
                )
            ''')
            # Confirmar los cambios
            self.conn.commit()
            # Confirma
            return True
        except sqlite3.Error as e:
            # Si ocurre un error, devolver un mensaje de fallo
            print(f"Fail: Error al crear la tabla 'clientes'. Detalle: {e}")
            return False
        
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
                self.cursor.execute('''
                    INSERT INTO ct (ct, idalim)
                    VALUES (?, ?)
                ''', (entry['SGE_COD_CT'], entry['SGE_COD_ALIM']))
            
            # Confirmar los cambios
            self.conn.commit()
            print("Success: Los datos se han insertado correctamente en la tabla 'ct'.")
            return True
        except sqlite3.Error as e:
            print(f"Fail: Error al insertar datos en la tabla 'ct'. Detalle: {e}")
            return False


    def cerrar_conexion(self):
        # Cerrar la conexión a la base de datos
        self.conn.close()

# Ejemplo de uso
# if __name__ == "__main__":
#     db = CreateTables()          # Crear instancia de la clase
#     db.crear_tabla_clientes()   # Crear la tabla 'clientes'
#     db.cerrar_conexion()        # Cerrar la conexión a la base de datos
