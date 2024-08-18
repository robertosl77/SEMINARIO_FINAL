from flask import Flask, request, jsonify, session, redirect, url_for
from flask_cors import CORS
from jsons.JsonValidador import JsonValidador
from bd.CreateTables import CreateTables

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

    @staticmethod
    @app.route('/API/BD/CreaTablas', methods=['POST'])
    def CreaTablas():
        try:
            Servicios.CreaTablaGeografico()
            Servicios.CreaTablaRed()
            Servicios.CreaTablaLog()
            Servicios.CreaTablaClientes()
            # 
            return jsonify({"Tablas creadas y datos insertados: ": True})  
        except Exception as e:
            return jsonify({"Tablas creadas y datos insertados: ": False}) 
                    
    # @app.route('/API/BD/CreaTablaGeografico', methods=['POST'])
    def CreaTablaGeografico():
        return jsonify({"respuesta": True})   
        authenticator= JsonValidador()
        json= authenticator.leer_json_geografico()
        #
        bd= CreateTables()
        resp= bd.crear_tabla_geografico()
        if resp:
            resp= bd.insertar_datos_geografico(json)
        #Cierro conexion
        bd.cerrar_conexion()
        return jsonify({"respuesta": resp})   

    # @app.route('/API/BD/CreaTablaRed', methods=['POST'])
    def CreaTablaRed():
        return jsonify({"respuesta": True})  
        authenticator= JsonValidador()
        bd= CreateTables()
        try:
            #ssee
            json= authenticator.leer_json_red('jsons/ssee.json')
            resp= bd.crear_tabla_ssee()
            if resp:
                resp= bd.insertar_datos_ssee(json)
                #alim
                json= authenticator.leer_json_red('jsons/alim.json')
                if resp:
                    resp= bd.crear_tabla_alim()
                    if resp:
                        resp= bd.insertar_datos_alim(json)
                        #ct
                        json= authenticator.leer_json_red('jsons/ct.json')
                        if resp:
                            resp= bd.crear_tabla_ct()
                            if resp:
                                resp= bd.insertar_datos_ct(json)
        except Exception as e:
            resp=False
        finally:
            #Cierro conexion
            bd.cerrar_conexion()
        return jsonify({"respuesta": resp})  

    # @app.route('/API/BD/CreaTablaLog', methods=['POST'])
    def CreaTablaLog():
        return jsonify({"respuesta": True})
        bd= CreateTables()
        resp= bd.crear_tabla_log()
        bd.cerrar_conexion()
        return jsonify({"respuesta": resp})

    @app.route('/API/BD/CreaTablaClientes', methods=['POST'])
    def CreaTablaClientes():
        # return jsonify({"respuesta": True})
        authenticator= JsonValidador()
        bd= CreateTables()
        json_clientes= authenticator.leer_json_red('jsons/clientes.json')
        json_ct= authenticator.leer_json_red('jsons/ct.json')
        resp= bd.crear_tabla_clientes()
        resp= bd.insertar_datos_clientes(json_clientes, json_ct)
        bd.cerrar_conexion()
        return jsonify({"respuesta": resp})



if __name__ == '__main__':
    app.run(debug=True)
