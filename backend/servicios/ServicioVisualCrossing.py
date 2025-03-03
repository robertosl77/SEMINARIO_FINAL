import requests
import pandas as pd
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
        
        # Ajustar acceso a los datos según el índice correcto y filtrar solo clientes afectados
        clientes_pronosticados = []
        for _, cliente in clientes_df.iterrows():
            for _, clima in clima_riesgoso.iterrows():
                if clima["conditions"].lower() not in ["clear", "partly cloudy"]:  # Excluir condiciones no relevantes
                    # Calcular prioridad basada en múltiples factores
                    prioridad = 1
                    if clima["precipprob"] > 80: prioridad += 1
                    if clima["windgust"] > 60: prioridad += 1
                    if clima["severerisk"] > 5: prioridad += 1
                    if clima["precipprob"] > 90 or clima["windgust"] > 80 or clima["severerisk"] > 8:
                        prioridad = 5  # Nivel máximo de riesgo
                    
                    clientes_pronosticados.append({
                        "cuenta": cliente[0],
                        "nombre_cliente": cliente[1],
                        "calle": cliente[2],
                        "numero": cliente[3],
                        "piso_dpto": cliente[4],
                        "localidad": cliente[5],
                        "partido": cliente[6],
                        "ct": cliente[7],
                        "alim": cliente[8],
                        "ssee": cliente[9],
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
                    })
        
        return clientes_pronosticados