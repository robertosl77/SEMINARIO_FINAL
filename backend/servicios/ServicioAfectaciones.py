import sqlite3
from bd.Datos import Datos
import json
from flask import jsonify


class ServicioAfectaciones:
    def __init__(self) -> None:
        None
    
    def nuevo_corte_at(self, ssee):
        try:
            datos = Datos()
            max_intentos = 100  # Número máximo de intentos
            intentos = 0

            # Si ssee es '0', busca una aleatoria con clientes EDP afectados
            while ssee == '0' and intentos < max_intentos:
                ssee = datos.random_id_ssee(ssee)
                cts = datos.obtiene_cts_from_ssee(str(ssee))
                if cts:  # Verifica si hay CTs válidos
                    break
                intentos += 1
                ssee = '0'  # Resetea a '0' para buscar nuevamente

            # Verificar si no se encontró una ssee válida
            if ssee == '0' or not cts:
                return json.dumps({"success": False, "error": "No se pudo encontrar una ssee válida con clientes afectados después de 10 intentos."})

            # Si se encontró una ssee válida
            datos.normalizar_ct(cts)
            datos.normalizar_sinctsafectados()
            idafectacion = datos.nueva_afectacion('AT')
            if idafectacion > 0:
                ct = datos.nueva_afectacion_elementos(idafectacion, cts)
                cl = datos.nueva_afectacion_afectados(idafectacion, cts)
                re = datos.nueva_afectacion_reclamos(idafectacion)

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
                        "reiteraciones": re[1]
                    }
                }
                # Devolver el JSON de éxito
                return jsonify(result)

            # Devolver False en caso de fallo en la creación de la afectación
            return json.dumps({"success": False, "error": "No se pudo crear la afectación."})

        except Exception as e:
            # Devolver False en caso de error
            return json.dumps({"success": False, "error": str(e)})
            
    def reclamos_reiteraciones(self):
        try:
            datos= Datos()
            datos.reclamos_reiteraciones()
            # Devolver el JSON de éxito
            return json.dumps({"success": True})
        
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
