from bd.Tarjetas import Tarjetas

class ServiciosManager:
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
        elif self.tarjeta=="reiteracion":
            tarjeta= self.tarjetas.tarjeta_reiteracion()
        elif self.tarjeta=="duracion":
            tarjeta= self.tarjetas.tarjeta_duracion()
        elif self.tarjeta=="sin_autonomia":
            tarjeta= self.tarjetas.tarjeta_sinautonomia()
        elif self.tarjeta=="nuevos":
            tarjeta= self.tarjetas.tarjeta_nuevos()
        elif self.tarjeta=="fae":
            tarjeta= self.tarjetas.tarjeta_fae()
        elif self.tarjeta=="ami":
            tarjeta= self.tarjetas.tarjeta_ami()
        elif self.tarjeta=="ge":
            tarjeta= self.tarjetas.tarjeta_ge()
        elif self.tarjeta=="seguimiento":
            tarjeta= self.tarjetas.tarjeta_seguimiento()
        elif self.tarjeta=="todos":
            tarjeta= self.tarjetas.tarjeta_todos()

        # Busquedas Puntuales
        solucion_provisoria= ["NUEVO", "ATENDIDO", "CON SUMINISTRO", "SE TRASLADA", "CON AUTONOMÍA", "REQUIERE GE", "GE INSTALADO", "RELLAMAR", "SEGUIMIENTO"]
        # marcas= self.tarjetas.obtiene_marcas()
        tabla_marcas =[ 
                {
                    "idmarca": marca[0],
                    "marca": marca[1],
                    "submarca": marca[2]
                } for marca in self.tarjetas.obtiene_marcas()
        ]
                        
        # Busca dashboard
        dashboard= self.tarjetas.obtiene_dashboard()
        # Estructura el resultado en un diccionario
        json = {
            "afectados": [
                {
                    "idafectacion": afectados[0],
                    "afectacion": afectados[1],
                    "tipo": afectados[2],
                    "estado": afectados[3],
                    "ct": afectados[4],
                    "inicio": afectados[5],
                    "restitucion": afectados[6],
                    "cuenta": afectados[7],
                    "gestion": afectados[8],
                    "fae": afectados[9],
                    "ami": afectados[10],
                    "ge_propio": afectados[11],
                    "cant_reclamos": afectados[12],
                    "cant_reiteraciones": afectados[13],
                    "aparatologia": [
                        {
                            "idartefacto": aparatologia[0],
                            "aparato": aparatologia[1],
                            "autonomia": aparatologia[2]
                        }
                        for aparatologia in self.tarjetas.obtiene_aparatologia(afectados[7])
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
                        for telefonos in self.tarjetas.obtiene_telefonos(afectados[7])
                    ],
                    "reclamos": [
                        {
                            "idreclamo": reclamos[0],
                            "idafectacion": reclamos[1],
                            "cuenta": reclamos[2],
                            "fecha": reclamos[3],
                            "reiteracion": reclamos[4],
                            "estado": reclamos[5],
                            "actuales": reclamos[6], 
                            "nro_reclamo": reclamos[7],
                        }
                        for reclamos in self.tarjetas.obtiene_reclamos(afectados[7])
                    ],
                    "marcas": [
                        {
                            "idclientemarca": marca[0],
                            "cuenta": marca[1],
                            "idmarca": marca[2],
                            "marca": marca[3],
                            "submarca": marca[4]
                        }
                        for marca in self.tarjetas.obtiene_marcas_clientes(afectados[7])
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
                        for contacto in self.tarjetas.obtiene_contactos(afectados[7])
                    ],
                    "afectaciones": [
                        {
                            "idafectacion": afectaciones[0],
                            "afectacion": afectaciones[1],
                            "tipo": afectaciones[2],
                            "estado": afectaciones[3],
                            "inicio": afectaciones[4],
                            "restitucion": afectaciones[5]
                        }
                        for afectaciones in self.tarjetas.obtiene_afectaciones(afectados[7])
                    ],
                    "pacientes": [
                        {
                            "idpaciente": pacientes[0],
                            "cuenta": pacientes[1],
                            "nombre_paciente": pacientes[2],
                            "dni": pacientes[3],
                            "lote": pacientes[4],
                            "inicio_recs": pacientes[5],
                            "fin_recs": pacientes[6],
                            "diagnostico": pacientes[7],
                            "riesgo": pacientes[8]
                        }
                        for pacientes in self.tarjetas.obtiene_pacientes(afectados[7])
                    ],
                    "cliente": [
                        {
                            "cuenta": cliente[0],
                            "nombre_cliente": cliente[1],
                            "calle": cliente[2],
                            "nro": cliente[3],
                            "piso_dpto": cliente[4],
                            "idlocalidad": cliente[5],
                            "region": cliente[6],
                            "localidad": cliente[7],
                            "partido": cliente[8],
                            "sector": cliente[9],
                            "ct": cliente[10],
                            "x": cliente[11],
                            "y": cliente[12],
                        }
                        for cliente in self.tarjetas.obtiene_cliente(afectados[7])
                    ]
                }
                for afectados in tarjeta
            ],
            "solucion_provisoria": solucion_provisoria, 
            "tabla_marcas": tabla_marcas, 
            "dashboard": dashboard
        }

        return json