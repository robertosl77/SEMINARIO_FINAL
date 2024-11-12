from bd.Datos import Datos

class ServicioClientes:
    def __init__(self) -> None:
        pass

    def obtiene_clientes(self):
        d = Datos()
        return d.obtiene_clientes()   