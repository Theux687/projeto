from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

usuarios = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/cadastro', methods=['POST'])
def cadastro():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('senha'):
        return jsonify({'msg': 'Dados inválidos'}), 400

    if any(u['email'] == data['email'] for u in usuarios):
        return jsonify({'msg': 'Email já cadastrado'}), 409

    usuarios.append({
        'nome': data.get('nome', ''),
        'email': data['email'],
        'senha': data['senha'],
        'empresa': data.get('empresa', '')
    })

    return jsonify({'msg': 'Usuário cadastrado com sucesso!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('senha'):
        return jsonify({'msg': 'Dados inválidos'}), 400

    user = next((u for u in usuarios if u['email'] == data['email'] and u['senha'] == data['senha']), None)

    if user:
        return jsonify({
            'msg': 'Login efetuado com sucesso!',
            'usuario': {'nome': user['nome'], 'email': user['email']}
        }), 200

    return jsonify({'msg': 'Credenciais inválidas'}), 401

if __name__ == '__main__':
    app.run(debug=True)
