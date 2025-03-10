from flask import Flask, request, jsonify, session
from flask_cors import CORS
from jsons.JsonValidador import JsonValidador
from servicios.ServicioClientes import ServicioClientes
from servicios.ServicioCreaTablas import ServicioCreaTablas
from servicios.ServicioAfectaciones import ServicioAfectaciones
from servicios.ServicioManager import ServicioManager
from servicios.ServicioGestor import ServicioGestor
from servicios.ServicioVisualCrossing import ServicioVisualCrossing
import re

app = Flask(__name__)  # Cambié el nombre de la instancia Flask a 'app'
CORS(app)

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "Backend is running"}), 200

# Configurar una clave secreta para manejar sesiones
app.secret_key = "\x8d~+\x88H\xba\xb1\xbf\xbb\x1e\xb2\xc8w\x80\xd4e\x87Q\xdfU'#\xd0\xc7"  # Asegúrate de usar una clave secreta segura

class Controlador:  # Cambié el nombre de la clase a 'ServiciosHandler'
    @app.route('/SGE/Login', methods=['POST'])
    def obtiene_usuario():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        
        if not validar_contrasena(password):
            pass
            # return jsonify({"success": False})

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
            crea_tablas= ServicioCreaTablas()
            crea_tablas.CreaTablaGeografico()
            crea_tablas.CreaTablaRed()
            crea_tablas.CreaTablaLog()
            crea_tablas.CreaTablaClientes()
            crea_tablas.CreaTablaPacientes()
            crea_tablas.CreaTablaArtefactos()
            crea_tablas.CreaTablaTelefonos()
            crea_tablas.CreaTablaContactos()
            crea_tablas.CreaTablaAfectaciones()
            crea_tablas.CreaTablaMarcas()
            crea_tablas.CreaTablaAfectados()
            crea_tablas.CreaTablaReclamos()
            return jsonify({"success": True}), 200
        except Exception as e:
            return jsonify({f"Error {e}: ": False}), 401

    @app.route('/API/AF/NuevaAfectacionAT/<ssee>', methods=['POST'])
    def NuevaAfectacionAT(ssee):
        a = ServicioAfectaciones()
        json = a.nuevo_corte_at(ssee)
        return json, 200

    @app.route('/API/AF/GeneraReclamos', methods=['POST'])
    def GeneraReclamos():
        a = ServicioAfectaciones()
        json = a.reclamos_reiteraciones()
        return json, 200  

    @app.route('/API/AF/NormalizarSinAfectaciones', methods=['POST'])
    def NormalizarNoAfectados():
        a = ServicioAfectaciones()
        json = a.normalizar_sinctsafectados()
        return json, 200    

    @app.route('/API/AF/NormalizarElementosAleatorios', methods=['POST'])
    def NormalizarElementosAleatorios():
        a = ServicioAfectaciones()
        json = a.normalizar_elementos_aleatorios()
        return json, 200  
    
    @app.route('/API/AF/NormalizaAfectacion/<idafectacion>', methods=['POST'])
    def NormalizaAfectacion(idafectacion):
        a = ServicioAfectaciones()
        json = a.normalizar_afectacion(idafectacion)
        return json, 200  

    @app.route('/API/AF/NormalizaAfectado/<cuenta>/<idafectacion>', methods=['POST'])
    def NormalizaAfectado(cuenta, idafectacion):
        a = ServicioAfectaciones()
        json = a.normalizar_afectado(cuenta, idafectacion)
        return json, 200  

    @app.route('/API/MN/GestionaTarjeta/<tarjeta>', methods=['GET'])
    def GestionaTarjeta(tarjeta):
        # Crear un diccionario para el JSON de éxito
        m = ServicioManager(tarjeta)
        json= m.gestiona_tarjeta()
        # Devolver el JSON de éxito
        return jsonify(json)

    @app.route('/API/GE/CambiaGestion/<cuenta>/<idafectacion>/<nueva_solucion>', methods=['POST'])
    def CambiaGestion(cuenta,idafectacion, nueva_solucion):
        g= ServicioGestor()
        json= g.cambia_gestion(cuenta,idafectacion, nueva_solucion)
        # Devolver el JSON de éxito
        return jsonify(json)

    @app.route('/API/GE/AgregaNota', methods=['POST'])
    def AgregaNota():
        data = request.get_json()
        cuenta = data.get('cuenta')
        idafectacion = data.get('idafectacion')
        usuario = data.get('usuario')
        nota = data.get('nota')
        # 
        g= ServicioGestor()
        if '' in [cuenta,idafectacion,usuario,nota]:
            return jsonify(False)
        json=g.agrega_nota(cuenta,idafectacion,usuario,nota)
        # Devolver el JSON de éxito
        return jsonify(json)

    @app.route('/API/GE/AgregaContacto', methods=['POST'])
    def AgregaContacto():
        data = request.get_json()
        cuenta = data.get('cuenta')
        idafectacion = data.get('idafectacion')
        usuario = data.get('usuario')
        contacto = data.get('contacto')
        idtelefono = data.get('idtelefono')
        efectivo = data.get('efectivo')
        # 
        g= ServicioGestor()
        if '' in [cuenta,idafectacion,usuario,contacto,idtelefono,efectivo]:
            return jsonify(False)
        json=g.agrega_contacto(cuenta,idafectacion,usuario,contacto,idtelefono,efectivo)
        # Devolver el JSON de éxito
        return jsonify(json)

    @app.route('/API/CL/ObtieneClientes', methods=['GET'])
    def ObtieneClientes():
        c = ServicioClientes()
        json= c.obtiene_clientes()
        # Devolver el JSON de éxito
        return jsonify(json) 



    # @app.route('/API/ME/ProximasTormentas', methods=['POST'])
    # def ProximasTormentas():
    #     a = ServicioAfectaciones()
        # json = a.normalizar_afectacion()
        # return json, 200  

    # @app.route('/API/ME/ProximasTormentas', methods=['POST'])
    # def ProximasTormentasVisualCrossing():
    #     servicio = ServicioVisualCrossing()
    #     clientes = servicio.obtener_clientes_pronosticados()
    #     return jsonify(clientes), 200    

    @app.route('/API/ME/ProximasTormentas', methods=['POST'])
    def ProximasTormentasVisualCrossing():
        servicio = ServicioVisualCrossing()
        # Obtener los valores de riesgo del cuerpo de la solicitud
        risk_values = request.get_json() or None
        clientes = servicio.obtener_clientes_pronosticados(risk_values)
        return jsonify(clientes), 200


def validar_contrasena(password):
    # Verificar que la contraseña tenga al menos 8 caracteres
    if len(password) < 8:
        print("La contraseña debe tener al menos 8 caracteres.")
        return False

    # Verificar que contenga al menos una letra mayúscula
    if not re.search(r'[A-Z]', password):
        print("La contraseña debe contener al menos una letra mayúscula.")
        return False

    # Verificar que contenga al menos una letra minúscula
    if not re.search(r'[a-z]', password):
        print("La contraseña debe contener al menos una letra minúscula.")
        return False

    # Verificar que contenga al menos un número
    if not re.search(r'\d', password):
        print("La contraseña debe contener al menos un número.")
        return False

    # # Verificar que contenga al menos un carácter especial
    # if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
    #     print("La contraseña debe contener al menos un carácter especial.")
    #     return False

    # Verificar que no contenga números secuenciales (ej. 1234)
    if re.search(r'(012|123|234|345|456|567|678|789|890)', password):
        print("La contraseña no debe contener números secuenciales.")
        return False

    # Lista de contraseñas fáciles de adivinar
    contrasenas_faciles = ["password", "12345678", "qwerty", "abc123", "admin", "user"]
    if password.lower() in contrasenas_faciles:
        print("La contraseña es demasiado fácil de adivinar.")
        return False

    print("La contraseña es válida.")
    return True
