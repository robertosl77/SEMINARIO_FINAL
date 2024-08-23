import sqlite3
from bd.Datos import Datos
import json
from flask import jsonify


class Afectaciones:
    def __init__(self) -> None:
        None
    
    def nuevo_corte_at(self, ssee):
        try:
            datos= Datos()
            ssee= datos.random_id_ssee(ssee) if ssee=='0' else ssee
            ssee= str(ssee)
            cts= datos.obtiene_cts_from_ssee(ssee)
            datos.normalizar_ct(cts)
            datos.normalizar_sinctsafectados()
            idafectacion= datos.nueva_afectacion('AT')
            if idafectacion>0:
                ct= datos.nueva_afectacion_elementos(idafectacion, cts)
                cl= datos.nueva_afectacion_afectados(idafectacion, cts)
                re= datos.nueva_afectacion_reclamos(idafectacion)

                # Crear un diccionario para el JSON de éxito
                result = {
                    "nueva_afectacion": {
                        "afectacion": idafectacion,
                        "ssee": ssee,
                        "origen": "AT",
                        "cts": ct,
                        # "cts_list": cts,
                        "clientes": cl,
                        "reclamos": re[0],
                        "reiteraciones":re[1]
                    }
                }
                # Devolver el JSON de éxito
                return jsonify(result)
            else:
                # Devolver False en caso de fallo
                return json.dumps({"success": False, "error": "No se pudo crear la afectación."})
        
        except Exception as e:
            # Devolver False en caso de error
            return json.dumps({"success": False, "error": str(e)})
            
    def normalizar_sinctsafectados(self):
        try:
            datos= Datos()
            datos.normalizar_sinctsafectados()
            # Devolver el JSON de éxito
            return json.dumps({"success": True})
        
        except Exception as e:
            # Devolver False en caso de error
            return json.dumps({"success": False, "error": str(e)})
            
    def normalizar_elementos_aleatorios(self):
        try:
            datos= Datos()
            cts= datos.obtiene_cts_aleatorios()
            datos.normalizar_ct(cts)
            datos.normalizar_sinctsafectados()   

            # Crear un diccionario para el JSON de éxito
            result = {
                "normalizados_aleatoriamente": {
                    "cantidad": len(cts),
                    # "cts": cts
                }
            } 
            # Devolver el JSON de éxito
            return jsonify(result)
        
        except Exception as e:
            # Devolver False en caso de error
            return json.dumps({"success": False, "error": str(e)})

    def normalizar_afectacion(self, idafectacion):
        try:
            datos= Datos()
            cts= datos.obtiene_cts_from_afectacion(idafectacion)
            datos.normalizar_ct(cts)
            datos.normalizar_sinctsafectados()
            # Crear un diccionario para el JSON de éxito
            result = {
                "normaliza_afectacion": {
                    "afectacion": idafectacion,
                    "cts": len(cts),
                }
            }
            # Devolver el JSON de éxito
            return jsonify(result)
        
        except Exception as e:
            # Devolver False en caso de error
            return json.dumps({"success": False, "error": str(e)})


# Ejemplo de uso
# if __name__ == "__main__":
#     afectaciones = Afectaciones()
#     afectaciones.nuevo_corte_at('0')  # Ejecuta con '0' para seleccionar un valor aleatorio
