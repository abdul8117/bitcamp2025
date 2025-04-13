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
  cursor.execute('INSERT INTO ChoreRecurrence (frequency) VALUES (?)', (repeat,))
  conn.commit()
  
  # get the id of the new recurrance
  row_id = cursor.lastrowid

  cursor.execute('INSERT INTO Chore (household_id, name, description, recurrence_id) VALUES (?, ?, ?, ?)', (household_id, chore_name, 'empty', row_id))
  conn.commit()
  conn.close()

def get_pets_for_household(household_id):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()

  query = '''
    SELECT 
        p.pet_id,
        p.user_id,
        u.name,
        p.pet_type
    FROM Pet p
    JOIN UserHousehold uh ON p.user_id = uh.user_id
    JOIN User u ON uh.user_id = u.user_id
    WHERE uh.household_id = ?;
  '''

  cursor.execute(query, (household_id,))
  pets = cursor.fetchall()
  conn.close()

  pets_list = []
  for row in pets:
      # row = [pet_id, user_id, user_name, pet_type]
      pets_list.append({
          'pet_id': row[0],
          'user_id': row[1],
          'user_name': row[2],
          'pet_type': row[3]
      })
      
  return pets_list

def get_chores_for_household(household_id):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    query = '''
    SELECT
        c.chore_id,
        c.name AS chore_name,
        c.description AS chore_description,
        h.name AS household_name,
        cr.frequency,
        cr.next_occurrence,
        ca.assigned_date,
        u.user_id AS assigned_user_id,
        u.name AS assigned_user_name
    FROM Chore c
    JOIN Household h ON c.household_id = h.household_id
    LEFT JOIN ChoreRecurrence cr ON c.recurrence_id = cr.recurrence_id
    LEFT JOIN ChoreAssignment ca ON c.chore_id = ca.chore_id
    LEFT JOIN User u ON ca.assigned_to = u.user_id
    WHERE c.household_id = ?
    '''

    cursor.execute(query, (household_id,))
    tasks = cursor.fetchall()
    conn.close()

    tasks_list = []
    for row in tasks:
        tasks_list.append({
            'chore_id': row[0],
            'chore_name': row[1],
            'description': row[2],
            'household': row[3],
            'frequency': row[4],
            'next_due': row[5],
            'assigned_date': row[6],
            'assigned_to': {
                'user_id': row[7],
                'name': row[8]
            } if row[7] else None
        })

    return tasks_list

# Add to db_manager.py
def get_household_members_db(household_id):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    query = '''
    SELECT u.user_id, u.name 
    FROM User u
    JOIN UserHousehold uh ON u.user_id = uh.user_id
    WHERE uh.household_id = ?
    '''
    cursor.execute(query, (household_id,))
    members = cursor.fetchall()
    conn.close()
    return [{'user_id': row[0], 'name': row[1]} for row in members]

def assign_chore_to_user(chore_id, user_id, assigned_date):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO ChoreAssignment (chore_id, assigned_to, assigned_date)
        VALUES (?, ?, ?)
    ''', (chore_id, user_id, assigned_date))
    conn.commit()
    conn.close()

def complete_chore(assignment_id, completed_by):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Record completion
    cursor.execute('''
        INSERT INTO ChoreCompletion (assignment_id, completed_by)
        VALUES (?, ?)
    ''', (assignment_id, completed_by))
    
    # Update recurrence if needed
    cursor.execute('''
        UPDATE ChoreRecurrence
        SET next_occurrence = DATE(next_occurrence, '+' || interval || ' ' || frequency_unit)
        WHERE recurrence_id IN (
            SELECT recurrence_id FROM Chore WHERE chore_id IN (
                SELECT chore_id FROM ChoreAssignment WHERE assignment_id = ?
            )
        )
    ''', (assignment_id,))
    
    conn.commit()
    conn.close()

def rotate_assignments(household_id):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Get rotation order
    cursor.execute('SELECT rotation_order FROM Household WHERE household_id = ?', (household_id,))
    rotation_order = cursor.fetchone()[0].split(',')
    
    # Get all chores
    chores = get_chores_for_household(household_id)
    
    # Get current assignments
    cursor.execute('''
        SELECT ca.chore_id, u.user_id 
        FROM ChoreAssignment ca
        JOIN User u ON ca.assigned_to = u.user_id
        WHERE ca.chore_id IN (
            SELECT chore_id FROM Chore WHERE household_id = ?
        )
    ''', (household_id,))
    current_assignments = {row[0]: row[1] for row in cursor.fetchall()}
    
    # Rotate each chore
    for chore in chores:
        current_user = current_assignments.get(chore['chore_id'])
        if current_user and rotation_order:
            current_index = rotation_order.index(str(current_user))
            next_index = (current_index + 1) % len(rotation_order)
            new_user = rotation_order[next_index]
            assign_chore_to_user(chore['chore_id'], new_user, datetime.date.today())
    
    conn.commit()
    conn.close()