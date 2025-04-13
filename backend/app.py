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
        
    # hash salted password here
    password_hash = generate_password_hash(password, method='scrypt', salt_length = 200) # hash the password with scrypt algorithm and a salt length of 200 bytes
    add_user(name, email, password_hash) # add user to the database with hased password. all 3 are strings
    session['user'] = {
        'name': name,
        'email': email
    }
    return jsonify({'message': 'User created'}), 201 # readback success

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    passwordInput = data.get('password')    
    
    user = get_user(email) # get user from the database

    if user: # check if the email exists in the database
        if check_password_hash(user[3], passwordInput): # check if the password matches the hashed password in the database
            session['user'] = {
                'name': user[1],  # Assuming user[1] contains the name
                'email': email
            }
            return jsonify({'message': 'Logged in'}), 200
        else:
            return jsonify({'error': 'Invalid password'}), 401
    else:
        return jsonify({'error': 'Invalid email'}), 401
            
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({'message': 'Logged out'}), 200

@app.route('/me', methods=['GET'])
def me():
    session.get('user', {}).get('email') 
    if name:
        return jsonify({'name': name})
    return jsonify({'error': 'Unauthorized'}), 401

@app.route('/set-pet', methods=['POST'])
def set_pet():
    data = request.json
    pet_type = data.get('pet_type')
    user_email = session.get('user', {}).get('email')

    user_id = get_user(user_email)[0] # get user from the database
    assign_pet_to_user(user_id, pet_type) # add pet to the database with the user id and pet type
    
    return jsonify({'message': 'Pet added'}), 201 # readback success

@app.route("/make-group", methods=["POST"])
def make_group():
    data = request.json
    group_id = data.get("groupID")
    group_name = data.get("groupName")
    user_email = session.get('user', {}).get('email')

    user_id = get_user(user_email)[0]

    household_id = create_household(group_name, group_id)
    add_user_to_household(user_id, household_id)

    return jsonify({'message': 'Group created', 'household_id': household_id, 'group_id': group_id, 'user_id': user_id}), 201

@app.route("/join-group", methods=["POST"])
def join_group():
    data = request.json
    group_id = data.get("groupID")
    user_email = session.get('user', {}).get('email')

    user_id = get_user(user_email)[0]

    household_id = get_household_by_group_id(group_id)[0] 
    add_user_to_household(user_id, household_id)

    return jsonify({'message': 'Group joined', 'household_id': household_id, 'group_id': group_id, 'user_id': user_id}), 201

@app.route("/get-chores-in-household", methods=["POST"])
def get_chores_in_household():
    user_email = session.get('user', {}).get('email')
    user_id = get_user(user_email)[0]

    household_id = get_household_by_user_id(user_id)
    chores = get_chores_for_household(household_id)

    return jsonify(chores), 200

# @app.route("/get-houses", methods=["POST"])
# def get_houses():
#     user_email = session.get('user', {}).get('email')
#     user_id = get_user(user_email)[0]

#     houses = get_user_households(user_id)
    
#     return jsonify(houses), 200

if __name__ == '__main__':
    app.run(debug=True)
