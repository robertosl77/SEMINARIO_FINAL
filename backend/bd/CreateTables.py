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
        except sqlite3.Error as e:
            print(f"Fail: Error al insertar datos en la tabla 'geografico'. Detalle: {e}")

    def cerrar_conexion(self):
        # Cerrar la conexión a la base de datos
        self.conn.close()

# Ejemplo de uso
if __name__ == "__main__":
    db = CreateTables()          # Crear instancia de la clase
    db.crear_tabla_clientes()   # Crear la tabla 'clientes'
    db.cerrar_conexion()        # Cerrar la conexión a la base de datos
