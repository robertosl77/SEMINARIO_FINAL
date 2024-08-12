from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)  # Crea la instancia de la aplicación Flask
CORS(app)

# Ruta de login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Obtiene los datos enviados por el frontend
    email = data.get('email')  # Extrae el email del JSON recibido
    password = data.get('password')  # Extrae la contraseña del JSON recibido

    # Aquí podrías conectar con una base de datos y validar las credenciales.
    # Este es solo un ejemplo básico de validación:
    if email == 'test@example.com' and password == 'password':
        return jsonify({"success": True})  # Responde al frontend con éxito
    else:
        return jsonify({"success": False})  # Responde al frontend con fallo

if __name__ == '__main__':
    app.run(debug=True)  # Inicia el servidor en modo debug
