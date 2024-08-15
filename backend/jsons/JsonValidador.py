import json
import os

class JsonValidador:
    def __init__(self):
        None

    def obtiene_usuario(self, username, password):
        json_path = os.path.join('jsons', 'usuarios.json')
        with open(json_path, 'r') as file:
            users = json.load(file)
        
        for user_id, user_data in users.items():
            if user_data['username'].lower() == username.lower() and user_data['password'] == password:
                return user_data  # Devuelve todos los datos del usuario si es válido
        return None  # Devuelve None si la validación falla
    
    def obtiene_rol(self,username):
        json_path = os.path.join('jsons', 'usuarios.json')
        with open(json_path, 'r') as file:
            users = json.load(file)
        # 
        for user_id, user_data in users.items():
            if user_data['username'] == username:
                return user_data['rol']
        return None
    
    def clave_secreta_flask(self):
        secret_key = os.urandom(24)
        return secret_key
    
    def leer_json_geografico(self, json_path='jsons/geografico.json'):
        try:
            # Leer el archivo JSON
            with open(json_path, 'r') as file:
                data = json.load(file)
            return data
        except Exception as e:
            print(f"Fail: Error al leer el archivo JSON. Detalle: {e}")
            return None

    def leer_json_red(self, json_path):
        try:
            with open(json_path, 'r') as file:
                data = json.load(file)
            return data
        except Exception as e:
            print(f"Fail: Error al leer el archivo JSON. Detalle: {e}")
            return None     