from flask import Flask, request, session, jsonify
from flask_cors import CORS
from db.db_manager import *

from werkzeug.security import generate_password_hash, check_password_hash # secondary objective, done

import sqlite3

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Change in production

CORS(app, supports_credentials=True)

# In-memory user store (for testing only)
emails = {}

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not password or not email:
        print("print line testing")
        return jsonify({'error': 'Username, password, or email required'}), 400
    
    # TODO add database support
    
    # hash salted password here
    password_hash = generate_password_hash(password, method='scrypt', salt_length = 200) # hash the password with scrypt algorithm and a salt length of 200 bytes
    add_user(username, email, password_hash) # add user to the database with hased password. all 3 are strings
    session['email'] = email
    return jsonify({'message': 'User created'}), 201 # readback success

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    passwordInput = data.get('password')    
    
    # if the email is not in the database, return an error
    if get_user(email): # check if the email exists in the database
        if check_password_hash(get_user(email)[3], passwordInput): # check if the password matches the hashed password in the database
            session['email'] = email
            return jsonify({'message': 'Logged in'}), 200
        else:
            return jsonify({'error': 'Invalid password'}), 401
    else:
        return jsonify({'error': 'Invalid email'}), 401
            
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
