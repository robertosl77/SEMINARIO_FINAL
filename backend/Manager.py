from bd.Tarjetas import Tarjetas

class Manager:
    def __init__(self, tarjeta) -> None:
        self.tarjeta = tarjeta
        self.tarjetas= Tarjetas()

    def gestiona_tarjeta(self):
        if self.tarjeta=="afectados":
            tarjeta= self.tarjetas.tarjeta_afectados()
        elif self.tarjeta=="normalizados":
            tarjeta= self.tarjetas.tarjeta_normalizados()
        elif self.tarjeta=="reclamos":
            tarjeta= self.tarjetas.tarjeta_reclamos()
        elif self.tarjeta=="":
            None
        elif self.tarjeta=="":
            None
        elif self.tarjeta=="":
            None

        # Busquedas Puntuales
        solucion_provisoria= ["Con Luz", "Requiere GE", "Se Traslada", "Rellamar"]
        marcas= self.tarjetas.obtiene_marcas()
        # Busca dashboard
        dashboard= self.tarjetas.obtiene_dashboard()
        # Estructura el resultado en un diccionario
        json = {
            "afectados": [
                {
                    "idafectacion": row[0],
                    "afectacion": row[1],
                    "tipo": row[2],
                    "estado": row[3],
                    "ct": row[4],
                    "inicio": row[5],
                    "restitucion": row[6],
                    "cuenta": row[7],
                    "gestion": row[8],
                    "aparatologia": [
                        {
                            "idartefacto": aparatologia[0],
                            "aparato": aparatologia[1],
                            "autonomia": aparatologia[2]
                        }
                        for aparatologia in self.tarjetas.obtiene_aparatologia(row[7])
                    ],
                    "telefonos": [
                        {
                            "idtelefono": telefonos[0],
                            "cuenta": telefonos[1],
                            "telefono": telefonos[2],
                            "tipo": telefonos[3],
                            "llamadas": telefonos[4],
                            "efectivas": telefonos[5]
                        }
                        for telefonos in self.tarjetas.obtiene_telefonos(row[7])
                    ],
                    "reclamos": [
                        {
                            "idreclamo": reclamos[0],
                            "idafectacion": reclamos[1],
                            "cuenta": reclamos[2],
                            "fecha": reclamos[3],
                            "reiteracion": reclamos[4],
                            "estado": reclamos[5],
                            "actuales": reclamos[6]
                        }
                        for reclamos in self.tarjetas.obtiene_reclamos(row[7])
                    ],
                    "marcas": [
                        {
                            "idclientemarca": marca[0],
                            "cuenta": marca[1],
                            "idmarca": marca[2],
                            "marca": marca[3],
                            "submarca": marca[4]
                        }
                        for marca in self.tarjetas.obtiene_marcas_clientes(row[7])
                    ],
                    "contactos": [
                        {
                            "idcontacto": contacto[0],
                            "cuenta": contacto[1],
                            "usuario": contacto[2],
                            "fechahora": contacto[3],
                            "observaciones": contacto[4],
                            "idtelefono": contacto[5],
                            "efectivo": contacto[6],
                            "telefono": contacto[7],
                            "tipo": contacto[8]
                        }
                        for contacto in self.tarjetas.obtiene_contactos(row[7])
                    ]
                }
                for row in tarjeta
            ],
            "solucion_provisoria": solucion_provisoria, 
            "marcas": marcas, 
            "dashboard": dashboard
        }

        return json