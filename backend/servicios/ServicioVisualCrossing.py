import requests
import pandas as pd
import json
import numpy as np
from bd.Datos import Datos

class ServicioVisualCrossing:
    def __init__(self):
        self.base_url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
        self.api_key = "5WFZVVH64JAQET5S6AV8WUQPT"  # API Key correcta

    def obtener_clientes_pronosticados(self, risk_values=None):
        """
        Obtiene el pronóstico y devuelve la lista de clientes con sus ubicaciones y la condición climática relevante.
        :param risk_values: Diccionario con los umbrales de riesgo (precipprob, windgust, severerisk)
        """
        ciudad = "buenos%20aires"  # Puedes modificar esto según necesidad
        url = f"{self.base_url}{ciudad}?unitGroup=metric&key={self.api_key}&contentType=json"

        # Valores por defecto si no se reciben desde el frontend
        risk_values = risk_values or {"precipprob": 80, "windgust": 50, "severerisk": 15}

        try:
            # Deshabilitar la verificación del certificado SSL
            response = requests.get(url, verify=False)

            if response.status_code != 200:
                print("Error al obtener datos climáticos", response.text)
                return {"error": "No se pudo obtener los datos climáticos. Código de estado: " + str(response.status_code)}

            data = response.json()
            pronostico_df = pd.DataFrame(data.get("days", []))

            # Aplicar filtro dinámico con los valores de riesgo usando AND (&)
            clima_riesgoso = pronostico_df[
                (pronostico_df["precipprob"] >= risk_values.get("precipprob", 20)) &
                (pronostico_df["windgust"] >= risk_values.get("windgust", 30)) &
                (pronostico_df["severerisk"] >= risk_values.get("severerisk", 10))
            ]

            if clima_riesgoso.empty:
                print("No hay eventos climáticos adversos con los umbrales actuales.")
                return []

            # Obtener la lista de todos los clientes con ubicación
            servicio_clientes = Datos()
            clientes_df = pd.DataFrame(servicio_clientes.obtiene_clientes())

            clientes_pronosticados = []
            for _, cliente in clientes_df.iterrows():
                if pd.isna(cliente[6]) or cliente[6] == "":  # Filtrar si no tiene partido
                    continue

                for _, clima in clima_riesgoso.iterrows():
                    clientes_pronosticados.append({
                        "cuenta": cliente[0],
                        "nombre_cliente": cliente[1],
                        "calle": cliente[2],
                        "numero": cliente[3],
                        "piso_dpto": cliente[4],
                        "localidad": cliente[5],
                        "partido": cliente[6],
                        "ct": cliente[7],
                        "alim": None if isinstance(cliente[8], float) and np.isnan(cliente[8]) else cliente[8],
                        "ssee": None if isinstance(cliente[9], float) and np.isnan(cliente[9]) else cliente[9],
                        "x": cliente[10],
                        "y": cliente[11],
                        "fecha_in_sistema": cliente[12],
                        "fecha_out_sistema": cliente[13],
                        "inicio_recs": cliente[14],
                        "fin_recs": cliente[15],
                        "vigencia": cliente[16],
                        "fecha_pronostico": clima["datetime"],
                        "condicion": clima["conditions"],
                        "probabilidad_lluvia": clima["precipprob"],
                        "viento_max": clima["windgust"],
                        "riesgo_severo": clima["severerisk"]
                    })

            return json.loads(json.dumps(clientes_pronosticados, default=lambda x: None if isinstance(x, float) and np.isnan(x) else x))

        except requests.exceptions.SSLError as ssl_error:
            print("Error de SSL:", ssl_error)
            return {"error": "Problema con los puertos. Es posible que la VPN esté bloqueando el puerto 443."}
        except requests.exceptions.RequestException as e:
            print("Error de conexión:", e)
            return {"error": "Error de conexión al intentar obtener los datos climáticos. Verifica tu conexión o configuración de red."}