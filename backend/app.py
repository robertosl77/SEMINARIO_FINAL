from flask import Flask, request, jsonify
from flask_cors import CORS

from JsonValidador import JsonValidador

app = Flask(__name__)  # Crea la instancia de la aplicación Flask
CORS(app)

# Ruta de login
@app.route('/SGE/Login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    authenticator = JsonValidador()
    is_valid = authenticator.validate_user(email, password)
    
    # if email == 'test@example.com' and password == 'password':
    if is_valid:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})


if __name__ == '__main__':
    app.run(debug=True)  # Inicia el servidor en modo debug
