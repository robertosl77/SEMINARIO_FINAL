import requests
import pandas as pd
import json
import numpy as np
from bd.Datos import Datos

class ServicioVisualCrossing:
    def __init__(self):
        self.base_url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
        self.api_key = "5WFZVVH64JAQET5S6AV8WUQPT"  # API Key correcta

    def obtener_clientes_pronosticados(self):
        """
        Obtiene el pronóstico y devuelve la lista de clientes con sus ubicaciones y la condición climática relevante.
        """
        ciudad = "buenos%20aires"  # Puedes modificar esto según necesidad
        url = f"{self.base_url}{ciudad}?unitGroup=metric&key={self.api_key}&contentType=json"
        response = requests.get(url)
        
        if response.status_code != 200:
            print("Error al obtener datos climáticos", response.text)
            return []
        
        data = response.json()
        pronostico_df = pd.DataFrame(data.get("days", []))
        
        # Filtrar condiciones meteorológicas más exigentes con AND
        # clima_riesgoso = pronostico_df[
        #     (pronostico_df["precipprob"] > 80) |  # Probabilidad de lluvia muy alta
        #     (pronostico_df["windgust"] > 70) |  # Fuertes ráfagas de viento
        #     (pronostico_df["severerisk"] > 15)  # Alto riesgo severo
        # ]

        # clima_riesgoso = pronostico_df[
        #     (pronostico_df["severerisk"] >= 15) &  # Alto riesgo severo
        #     (pronostico_df["windgust"] > 50)   # Fuertes ráfagas de viento
        # ]

        clima_riesgoso = pronostico_df[
            (pronostico_df["severerisk"] >= 15)   # Alto riesgo severo
        ]

        if clima_riesgoso.empty:
            print("No hay eventos climáticos adversos relevantes en los datos recibidos")
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
