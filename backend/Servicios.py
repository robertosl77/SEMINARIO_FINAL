from flask import Flask, request, jsonify, session, redirect, url_for
from flask_cors import CORS
from jsons.JsonValidador import JsonValidador
from bd.Simulados import Simulados

servicios = Flask(__name__)
CORS(servicios)

# Configurar una clave secreta para manejar sesiones
servicios.secret_key = "\x8d~+\x88H\xba\xb1\xbf\xbb\x1e\xb2\xc8w\x80\xd4e\x87Q\xdfU'#\xd0\xc7"  # Asegúrate de usar una clave secreta segura

class Servicios:
    # Ruta de login
    @servicios.route('/SGE/Login', methods=['POST'])
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

    @servicios.route('/SGE/Logout', methods=['POST'])
    def logout():
        session.pop('username', None)  # Elimina la sesión del usuario
        return jsonify({"success": True})
    
    @servicios.route('/API/Rol', methods=['GET'])
    def rol():
        if 'username' not in session:
            return jsonify({"error": "User not logged in"}), 401  # Verifica si el usuario está en la sesión
        
        username = session['username']
        authenticator = JsonValidador()
        rol = authenticator.obtiene_rol(username)
        return jsonify({"rol": rol})

    @servicios.route('/API/SecretKey', methods=['GET'])
    def secret_key():
        if 'username' not in session:
            return jsonify({"error": "User not logged in"}), 401  # Verifica si el usuario está en la sesión
        
        authenticator = JsonValidador()
        secret_key = authenticator.clave_secreta_flask()
        print(secret_key)
        return secret_key

    @staticmethod
    @servicios.route('/API/BD/CreaTablas', methods=['POST'])
    def CreaTablas():
        try:
            simulados= Simulados()
            # simulados.CreaTablaGeografico()
            # simulados.CreaTablaRed()
            # simulados.CreaTablaLog()
            # simulados.CreaTablaClientes()
            simulados.CreaTablaPacientes()
            # 
            return jsonify({"Tablas creadas y datos insertados: ": True})  
        except Exception as e:
            return jsonify({f"Error {e}: ": False}) 
                    



if __name__ == '__main__':
    servicios.run(debug=True)
