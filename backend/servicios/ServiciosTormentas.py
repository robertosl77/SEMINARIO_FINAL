# 726e87aa626942da836185317242108
import requests

class ServiciosTormentas:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "http://api.weatherapi.com/v1/forecast.json"
    
    def obtener_alertas(self, localidad=None, partido=None, coordenadas=None):
        params = {
            "key": self.api_key,
            "days": 7,  # Pronóstico para 7 días
        }

        if localidad and partido:
            params["q"] = f"{localidad}, {partido}"
        elif coordenadas:
            params["q"] = f"{coordenadas[0]},{coordenadas[1]}"
        else:
            raise ValueError("Debe proporcionar localidad/partido o coordenadas")

        response = requests.get(self.base_url, params=params)
        data = response.json()

        alertas = []
        for day in data['forecast']['forecastday']:
            fecha = day['date']
            dia = day['day']
            condiciones = []

            # Verifica condiciones
            if dia['maxwind_kph'] > 50:  # Vientos fuertes > 50 km/h
                condiciones.append(f"Vientos fuertes: {dia['maxwind_kph']} km/h")

            if dia['totalprecip_mm'] > 30:  # Lluvias torrenciales > 30 mm
                condiciones.append(f"Lluvias torrenciales: {dia['totalprecip_mm']} mm")

            if dia['maxtemp_c'] > 35:  # Alta temperatura > 35°C
                condiciones.append(f"Alta temperatura: {dia['maxtemp_c']}°C")

            if dia['mintemp_c'] < 0:  # Baja temperatura < 0°C
                condiciones.append(f"Baja temperatura: {dia['mintemp_c']}°C")

            if condiciones:
                alertas.append({
                    "fecha": fecha,
                    "condiciones": condiciones
                })

        return alertas

# Ejemplo de uso
# if __name__ == "__main__":
#     tormentas = Alertas(api_key="726e87aa626942da836185317242108")
#     alertas = tormentas.obtener_alertas(localidad="ACASSUSO", partido="SAN ISIDRO")
#     for alerta in alertas:
#         print(f"Fecha: {alerta['fecha']}")
#         for condicion in alerta['condiciones']:
#             print(f"  - {condicion}")
