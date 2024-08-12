import json
import os

class JsonValidador:
    def __init__(self):
        None

    def validate_user(self, email, password):
        json_path = os.path.join('json', 'usuarios.json')
        with open(json_path, 'r') as file:
            users = json.load(file)
        # 
        for user_id, user_data in users.items():
            if user_data['email'] == email and user_data['password'] == password:
                return True
        return False
    
     

# Ejemplo de uso:
# if __name__ == "__main__":
#     authenticator = JsonValidador(os.path.join('json', 'usuarios.json'))
#     is_valid = authenticator.validate_user("user1@example.com", "password1")
#     print("User is valid:", is_valid)
