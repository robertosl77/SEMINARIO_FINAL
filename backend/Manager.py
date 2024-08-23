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
        elif self.tarjeta=="":
            None
        elif self.tarjeta=="":
            None
        elif self.tarjeta=="":
            None
        elif self.tarjeta=="":
            None

        return tarjeta