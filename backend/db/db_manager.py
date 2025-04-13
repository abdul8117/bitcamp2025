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

def create_household(house_name, group_id):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('INSERT INTO Household (name, group_id) VALUES (?, ?)', (house_name, group_id))
  conn.commit()
  new_id = cursor.lastrowid
  conn.close()
  return new_id

def add_user_to_household(user_id, household_id):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('INSERT INTO UserHousehold (user_id, household_id) VALUES (?, ?)', (user_id, household_id))
  conn.commit()
  conn.close()

def get_household_by_group_id(group_id):
  # we are assuming for now that each household has a unique group id
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('SELECT * FROM Household WHERE group_id = ?', (group_id,))
  household = cursor.fetchone()
  conn.close()
  return household

def get_household_by_user_id(user_id):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('SELECT household_id FROM UserHousehold WHERE user_id = ?', (user_id,))
    row = cursor.fetchone()  # row might be (123,) 
    conn.close()
    if row:
        return row[0]        # Return 123 as an integer
    return None

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
  
def assign_pet_to_user(user_id, pet_type):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('INSERT INTO Pet (user_id, pet_type) VALUES (?, ?)', (user_id, pet_type))
  conn.commit()
  conn.close()



def get_user_households(user_id):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  query = '''
    SELECT h.name FROM Household h
    JOIN UserHousehold uh ON h.household_id = uh.household_id
    WHERE uh.user_id = ?
  '''
  cursor.execute(query, (user_id,))
  households = cursor.fetchall()
  conn.close()

  return households

def add_chore_to_household(chore_name, repeat, household_id):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()

  # add new recurrance to ChoreRecurrance table
  cursor.execute('INSERT INTO ChoreRecurrance (frequency) VALUES (?)', (repeat,))
  conn.commit()
  
  # get the id of the new recurrance
  row_id = cursor.lastrowid

  cursor.execute('INSERT INTO Chore (household_id, name, description, recurrance_id) VALUES (?, ?, ?, ?)', (household_id, chore_name, 'empty', row_id))
  conn.commit()
  conn.close()