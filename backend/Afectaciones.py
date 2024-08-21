import sqlite3
from bd.Datos import Datos
import json
from flask import jsonify


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
                ct= datos.nueva_afectacion_elementos(idafectacion, cts)
                cl= datos.nueva_afectacion_afectados(idafectacion, cts)
                re= datos.nueva_afectacion_reclamos(idafectacion)

                # Crear un diccionario para el JSON de éxito
                result = {
                    idafectacion: {
                        "afectacion": idafectacion,
                        "cant_ct": ct,
                        "cant_clientes": cl,
                        "cant_reclamos": re
                    }
                }
                # Devolver el JSON de éxito
                return jsonify(result)
            else:
                # Devolver False en caso de fallo
                return json.dumps({"success": False, "error": "No se pudo crear la afectación."})
        
        except sqlite3.Error as e:
            # Devolver False en caso de error
            return json.dumps({"success": False, "error": str(e)})
            

# Ejemplo de uso
# if __name__ == "__main__":
#     afectaciones = Afectaciones()
#     afectaciones.nuevo_corte_at('0')  # Ejecuta con '0' para seleccionar un valor aleatorio
