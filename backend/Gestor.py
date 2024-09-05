from bd.Datos import Datos

class Gestor:
    def __init__(self) -> None:
        pass

    def cambia_gestion(self, cuenta,idafectacion, nueva_solucion):
        d = Datos()
        return d.cambia_gestion(cuenta,idafectacion,nueva_solucion)
    
    def agrega_nota(self,cuenta,idafectacion,usuario,nota):
        d = Datos()
        return d.agrega_nota(cuenta,idafectacion,usuario,nota)
    
    def agrega_contacto(self,cuenta,idafectacion,usuario,contacto,idtelefono,efectivo):
        d = Datos()
        return d.agrega_contacto(cuenta,idafectacion,usuario,contacto,idtelefono,efectivo)    