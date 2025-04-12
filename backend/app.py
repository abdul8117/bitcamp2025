from flask import Flask, request, session, jsonify
from flask_cors import CORS

import sqlite3

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Change in production

CORS(app, supports_credentials=True)

# In-memory user store (for testing only)
users = {}

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400
    if username in users:
        return jsonify({'error': 'Username already exists'}), 409
    
    # TODO add database support

    users[username] = password
    return jsonify({'message': 'User created'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if users.get(username) != password:
        return jsonify({'error': 'Invalid credentials'}), 401

    session['username'] = username
    return jsonify({'message': 'Logged in'}), 200

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({'message': 'Logged out'}), 200

@app.route('/me', methods=['GET'])
def me():
    username = session.get('username')
    if username:
        return jsonify({'username': username})
    return jsonify({'error': 'Unauthorized'}), 401

if __name__ == '__main__':
    app.run(debug=True)
