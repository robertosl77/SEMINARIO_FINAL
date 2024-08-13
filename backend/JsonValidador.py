import json
import os

class JsonValidador:
    def __init__(self):
        None

    def validate_user(self, username, password):
        json_path = os.path.join('json', 'usuarios.json')
        with open(json_path, 'r') as file:
            users = json.load(file)
        # 
        for user_id, user_data in users.items():
            if user_data['username'] == username and user_data['password'] == password:
                return True
        return False
    
    def obtiene_rol(self,username):
        json_path = os.path.join('json', 'usuarios.json')
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

# Ejemplo de uso:
# if __name__ == "__main__":
#     authenticator = JsonValidador(os.path.join('json', 'usuarios.json'))
#     is_valid = authenticator.validate_user("user1@example.com", "password1")
#     print("User is valid:", is_valid)
