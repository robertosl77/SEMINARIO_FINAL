from Servicios import app  # Importa la instancia 'app' de Flask desde Servicios.py

class App:
    @staticmethod
    def run():
        app.run(debug=True, port=5000, use_reloader=False) # Se asegura de que 'app' es la instancia correcta

if __name__ == '__main__':
    App.run()
