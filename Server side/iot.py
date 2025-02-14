from flask import Flask, request, jsonify
from cryptography.fernet import Fernet

app = Flask(__name__)

def load_key():
    with open("encryption_key.key", "rb") as key_file:
        return key_file.read()

@app.route('/receive', methods=['POST'])
def receive():
    enc_message = request.json['encrypted_message']
    device_id = request.json['device_id']
    key = load_key()
    fernet = Fernet(key)
    dec_message = fernet.decrypt(enc_message).decode()
    print(f'Encryted Message: {enc_message}\nDecrypted Message: {dec_message}')

    return jsonify({'message': f'Message received. Acknowledgement from device {device_id}'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)