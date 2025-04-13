from flask import Flask, request, session, jsonify
from flask_cors import CORS
from db.db_manager import *

from werkzeug.security import generate_password_hash, check_password_hash # secondary objective, done

import sqlite3

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Change in production

CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"], supports_credentials=True) # Allow CORS for frontend  

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not password or not email:
        print("print line testing")
        return jsonify({'error': 'name, password, or email required'}), 400
    
    # TODO add database support
    
    # hash salted password here
    password_hash = generate_password_hash(password, method='scrypt', salt_length = 200) # hash the password with scrypt algorithm and a salt length of 200 bytes
    add_user(name, email, password_hash) # add user to the database with hased password. all 3 are strings
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
    session.pop('name', None)
    return jsonify({'message': 'Logged out'}), 200

@app.route('/me', methods=['GET'])
def me():
    name = session.get('name')
    if name:
        return jsonify({'name': name})
    return jsonify({'error': 'Unauthorized'}), 401

@app.route('/set-pet', methods=['POST'])
def set_pet():
    data = request.json
    pet_type = data.get('pet_type')
    user_email = session.get('email')

    user_id = get_user(user_email)[0] # get user from the database
    assign_pet_to_user(user_id, pet_type) # add pet to the database with the user id and pet type
    
    return jsonify({'message': 'Pet added'}), 201 # readback success

if __name__ == '__main__':
    app.run(debug=True)
