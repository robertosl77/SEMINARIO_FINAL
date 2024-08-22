from flask import Flask, request, jsonify, session
from flask_cors import CORS
from jsons.JsonValidador import JsonValidador
from Simulados import Simulados
from Afectaciones import Afectaciones

app = Flask(__name__)  # Cambié el nombre de la instancia Flask a 'app'
CORS(app)

# Configurar una clave secreta para manejar sesiones
app.secret_key = "\x8d~+\x88H\xba\xb1\xbf\xbb\x1e\xb2\xc8w\x80\xd4e\x87Q\xdfU'#\xd0\xc7"  # Asegúrate de usar una clave secreta segura

class ServiciosHandler:  # Cambié el nombre de la clase a 'ServiciosHandler'
    @app.route('/SGE/Login', methods=['POST'])
    def obtiene_usuario():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        authenticator = JsonValidador()
        user_data = authenticator.obtiene_usuario(username, password)
        
        if user_data:
            session['username'] = user_data['username']
            session['rol'] = user_data['rol']
            return jsonify({"success": True, "user": user_data})
        else:
            return jsonify({"success": False})

    @app.route('/SGE/Logout', methods=['POST'])
    def logout():
        session.pop('username', None)
        return jsonify({"success": True})
    
    @app.route('/API/Rol', methods=['GET'])
    def rol():
        if 'username' not in session:
            return jsonify({"error": "User not logged in"}), 401
        
        username = session['username']
        authenticator = JsonValidador()
        rol = authenticator.obtiene_rol(username)
        return jsonify({"rol": rol})

    @app.route('/API/SecretKey', methods=['GET'])
    def secret_key():
        if 'username' not in session:
            return jsonify({"error": "User not logged in"}), 401
        
        authenticator = JsonValidador()
        secret_key = authenticator.clave_secreta_flask()
        print(secret_key)
        return secret_key

    @staticmethod
    @app.route('/API/BD/CreaTablas', methods=['POST'])
    def CreaTablas():
        try:
            simulados = Simulados()
            return jsonify({"success": True}), 200
        except Exception as e:
            return jsonify({f"Error {e}: ": False}), 401

    @app.route('/API/AF/NuevaAfectacionAT/<ssee>', methods=['POST'])
    def NuevaAfectacionAT(ssee):
        a = Afectaciones()
        json = a.nuevo_corte_at(ssee)
        return json, 200
    
    @app.route('/API/AF/NormalizarSinAfectaciones', methods=['POST'])
    def NormalizarNoAfectados():
        a = Afectaciones()
        json = a.normalizar_sinctsafectados()
        return json, 200    

    @app.route('/API/AF/NormalizarElementosAleatorios', methods=['POST'])
    def NormalizarElementosAleatorios():
        a = Afectaciones()
        json = a.normalizar_elementos_aleatorios()
        return json, 200  
    
    @app.route('/API/AF/NormalizaAfectacion/<idafectacion>', methods=['POST'])
    def NormalizaAfectacion(idafectacion):
        a = Afectaciones()
        json = a.normalizar_afectacion(idafectacion)
        return json, 200  

    @app.route('/API/ME/ProximasTormentas', methods=['POST'])
    def ProximasTormentas():
        a = Afectaciones()
        # json = a.normalizar_afectacion()
        # return json, 200  
