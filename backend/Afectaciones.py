import sqlite3
import random
from bd.Datos import Datos

class Afectaciones:
    def __init__(self, db_name='sgedatabase.db') -> None:
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()
    
    def nuevo_corte_at(self, ssee):
        try:
            datos= Datos()
            ssee= datos.random_id_ssee(ssee) if ssee=='0' else ssee
            ssee= str(ssee)
            cts= datos.obtiene_cts_from_ssee(ssee)
            datos.normalizar_ct(cts)
            datos.normalizar_documentos_sinctsafectados()
            idafectacion= datos.nueva_afectacion('AT')
            if idafectacion>0:
                datos.nueva_afectacion_elementos(idafectacion, cts)
                datos.nueva_afectacion_afectados(idafectacion, cts)
                datos.nueva_afectacion_reclamos(idafectacion)
        except sqlite3.Error as e:
            print(f"Error al realizar el SELECT: {e}")
            

# Ejemplo de uso
# if __name__ == "__main__":
#     afectaciones = Afectaciones()
#     afectaciones.nuevo_corte_at('0')  # Ejecuta con '0' para seleccionar un valor aleatorio
