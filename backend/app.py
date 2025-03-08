from controladores.Controlador import app
import os

class App:
    @staticmethod
    def run():
        # Obtener el puerto desde la variable de entorno PORT, o usar 5000 por defecto
        port = int(os.getenv("PORT", 5000))
        # Configurar el host en 0.0.0.0 para que sea accesible externamente
        app.run(host='0.0.0.0', port=port, debug=False, use_reloader=False)

if __name__ == '__main__':
    App.run()

'''


'''