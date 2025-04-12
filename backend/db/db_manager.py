import sqlite3

DB_NAME = 'db/database.db'

def add_user(name, email, password):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()

  # Insert a new user into the users table
  cursor.execute('INSERT INTO User (name, email, password) VALUES (?, ?, ?)', (name, email, password))
  conn.commit()
  conn.close()

def get_user(email):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()

  # Retrieve the user from the users table
  cursor.execute('SELECT * FROM User WHERE email = ?', (email,))
  user = cursor.fetchone()
  conn.close()

  return user

def add_chore(household_id, chore_name, description, recurrance_id):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('INSERT INTO Chore (household_id, name, description, recurrance_id) VALUES (?, ?, ?, ?)', (household_id, chore_name, description, recurrance_id))
  conn.commit()
  conn.close()
  
def get_chore(chore_id):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('SELECT * FROM Chore WHERE chore_id = ?', (chore_id,))
  selectedchore = cursor.fetchone()
  conn.close()
  return selectedchore

def get_chores(household_id):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('SELECT * FROM Chore WHERE household_id = ?', (household_id,))
  chores = cursor.fetchall()
  conn.close()
  return chores

def create_household(house_name):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('INSERT INTO Household (name) VALUES (?)', (house_name,))
  conn.commit()
  conn.close()

def add_user_to_household(user_id, household_id):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('INSERT INTO UserHousehold (user_id, household_id) VALUES (?, ?)', (user_id, household_id))
  conn.commit()
  conn.close()

def complete_chore(assignment_id, user_id, completed_at):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('INSERT INTO ChoreCompletion (assignment_id, completed_by, completed_at) VALUES (?, ?, ?)', (assignment_id, user_id, completed_at))
  conn.commit()
  conn.close()
  
def substitute_chore(original_user_id, substitute_user_id, assignment_id):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('INSERT INTO ChoreSubstitution (original_user_id, substitute_user_id, assignment_id) VALUES (?, ?, ?)', (original_user_id, substitute_user_id, assignment_id))
  conn.commit()
  conn.close()

def get_chores_for_household(household_id):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('SELECT * FROM Chore WHERE household_id = ?', (household_id,))
  chores = cursor.fetchall()
  conn.close()
  return chores

# IGNORE FOR NOW - this is a placeholder for the chore debt system
def get_user_chore_debt(user_id, creditor_id, debtor_id, chore_id, amount_owed):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('SELECT * FROM ChoreDebt WHERE creditor_id = ? OR debtor_id = ?', (user_id, user_id))
  debts = cursor.fetchall()
  conn.close()
  return debts

def get_users_in_household(household_id):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('SELECT * FROM UserHousehold WHERE household_id = ?', (household_id,))
  users = cursor.fetchall()
  conn.close()
  return users
  