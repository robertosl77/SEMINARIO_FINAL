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
        Obtiene el pronóstico de los próximos 7 días y devuelve la lista de clientes con sus ubicaciones y la condición climática que los afecta.
        """
        ciudad = "buenos%20aires"  # Puedes modificar esto según necesidad
        url = f"{self.base_url}{ciudad}?unitGroup=metric&key={self.api_key}&contentType=json"
        response = requests.get(url)
        
        if response.status_code != 200:
            print("Error al obtener datos climáticos", response.text)
            return []
        
        data = response.json()
        hoy = pd.to_datetime("today").date()
        pronostico_df = pd.DataFrame(data.get("days", []))
        
        # Filtrar solo los próximos 7 días desde hoy
        pronostico_df["datetime"] = pd.to_datetime(pronostico_df["datetime"])
        pronostico_df = pronostico_df[(pronostico_df["datetime"].dt.date > hoy) &
                                      (pronostico_df["datetime"].dt.date <= hoy + pd.Timedelta(days=7))]
        
        # Detectar condiciones adversas
        clima_riesgoso = pronostico_df[
            (pronostico_df["precipprob"] > 70) |  # Alta probabilidad de lluvia
            (pronostico_df["windgust"] > 50) |  # Fuertes ráfagas de viento
            (pronostico_df["severerisk"] > 3)  # Riesgo severo alto
        ]
        
        if clima_riesgoso.empty:
            print("No hay eventos climáticos adversos en los próximos 7 días")
            return []
        
        # Obtener la lista de todos los clientes con ubicación
        servicio_clientes = Datos()
        clientes_df = pd.DataFrame(servicio_clientes.obtiene_clientes())
        
        # Diccionario para almacenar la condición más severa por cliente
        clientes_dict = {}
        
        for _, cliente in clientes_df.iterrows():
            for _, clima in clima_riesgoso.iterrows():
                if clima["conditions"].lower() not in ["clear", "partially cloudy", "rain, partially cloudy"]:
                    prioridad = min(5, 
                        (1 if clima["precipprob"] > 70 else 0) +
                        (1 if clima["precipprob"] > 80 else 0) +
                        (1 if clima["windgust"] > 50 else 0) +
                        (1 if clima["windgust"] > 60 else 0) +
                        (1 if clima["severerisk"] > 3 else 0) +
                        (1 if clima["severerisk"] > 5 else 0)
                    )
                    
                    cuenta = cliente[0]
                    if cuenta not in clientes_dict or clientes_dict[cuenta]["prioridad"] < prioridad:
                        clientes_dict[cuenta] = {
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
                            "fecha_pronostico": clima["datetime"].date().isoformat(),
                            "condicion": clima["conditions"],
                            "probabilidad_lluvia": clima["precipprob"],
                            "viento_max": clima["windgust"],
                            "riesgo_severo": clima["severerisk"],
                            "prioridad": prioridad
                        }
        
        return json.loads(json.dumps(list(clientes_dict.values()), default=lambda x: None if isinstance(x, float) and np.isnan(x) else x))
