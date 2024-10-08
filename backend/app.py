from flask import Flask, request, jsonify, session, redirect, url_for
from flask_cors import CORS
from JsonValidador import JsonValidador

app = Flask(__name__)
CORS(app)

# Configurar una clave secreta para manejar sesiones
app.secret_key = "\x8d~+\x88H\xba\xb1\xbf\xbb\x1e\xb2\xc8w\x80\xd4e\x87Q\xdfU'#\xd0\xc7"  # Asegúrate de usar una clave secreta segura

class Servicios:
    # Ruta de login
    @app.route('/SGE/Login', methods=['POST'])
    def obtiene_usuario():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        authenticator = JsonValidador()
        user_data = authenticator.obtiene_usuario(username, password)
        
        if user_data:
            session['username'] = user_data['username']  # Guarda el nombre de usuario en la sesión
            session['rol'] = user_data['rol']  # Guarda el rol en la sesión, si lo deseas
            return jsonify({"success": True, "user": user_data})  # Devuelve los datos del usuario
        else:
            return jsonify({"success": False})

    @app.route('/SGE/Logout', methods=['POST'])
    def logout():
        session.pop('username', None)  # Elimina la sesión del usuario
        return jsonify({"success": True})
    
    @app.route('/API/Rol', methods=['GET'])
    def rol():
        if 'username' not in session:
            return jsonify({"error": "User not logged in"}), 401  # Verifica si el usuario está en la sesión
        
        username = session['username']
        authenticator = JsonValidador()
        rol = authenticator.obtiene_rol(username)
        return jsonify({"rol": rol})

    @app.route('/API/SecretKey', methods=['GET'])
    def secret_key():
        if 'username' not in session:
            return jsonify({"error": "User not logged in"}), 401  # Verifica si el usuario está en la sesión
        
        authenticator = JsonValidador()
        secret_key = authenticator.clave_secreta_flask()
        print(secret_key)
        return secret_key
   

if __name__ == '__main__':
    app.run(debug=True)
