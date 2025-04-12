import sqlite3

DB_NAME = 'db/database.db'

def create_database():
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()

  # delete the database if it exists
  cursor.execute('DROP TABLE IF EXISTS User')
  cursor.execute('DROP TABLE IF EXISTS Household')
  cursor.execute('DROP TABLE IF EXISTS UserHousehold')
  cursor.execute('DROP TABLE IF EXISTS Chores')
  cursor.execute('DROP TABLE IF EXISTS ChoreRecurrence')
  cursor.execute('DROP TABLE IF EXISTS ChoreAssignment')
  cursor.execute('DROP TABLE IF EXISTS ChoreCompletion')
  cursor.execute('DROP TABLE IF EXISTS ChoreSubstitution')
  cursor.execute('DROP TABLE IF EXISTS ChoreDebt')
  conn.commit()

  statement = '''
    CREATE TABLE User (
        user_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

    CREATE TABLE Household (
        household_id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );

    CREATE TABLE UserHousehold (
        user_id INT NOT NULL,
        household_id INT NOT NULL,
        PRIMARY KEY (user_id, household_id),
        FOREIGN KEY (user_id) REFERENCES User(user_id),
        FOREIGN KEY (household_id) REFERENCES Household(household_id)
    );

    CREATE TABLE Chore (
        chore_id SERIAL PRIMARY KEY,
        household_id INT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        recurrence_id INT,  -- link to ChoreRecurrence for repeating logic
        FOREIGN KEY (household_id) REFERENCES Household(household_id)
    );

    CREATE TABLE ChoreRecurrence (
      recurrence_id   SERIAL PRIMARY KEY,
      frequency       TEXT NOT NULL CHECK (
                        frequency IN (
                          'never',
                          'every_day',
                          'every_week',
                          'every_2_weeks',
                          'every_month',
                          'every_year',
                          'custom'
                        )
                      ),
      interval        INT DEFAULT 1,
      custom_rule     TEXT,               -- if frequency = 'custom', store advanced patterns
      start_date      DATE,               -- optional: date recurrence begins
      end_date        DATE                -- optional: date recurrence ends
    );

    CREATE TABLE ChoreAssignment (
        assignment_id SERIAL PRIMARY KEY,
        chore_id INT NOT NULL,
        assigned_date DATE NOT NULL,
        assigned_to INT NOT NULL,
        FOREIGN KEY (chore_id) REFERENCES Chore(chore_id),
        FOREIGN KEY (assigned_to) REFERENCES User(user_id)
    );

    CREATE TABLE ChoreCompletion (
        completion_id SERIAL PRIMARY KEY,
        assignment_id INT NOT NULL,
        completed_by INT NOT NULL,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (assignment_id) REFERENCES ChoreAssignment(assignment_id),
        FOREIGN KEY (completed_by) REFERENCES User(user_id)
    );

    CREATE TABLE ChoreSubstitution (
        substitution_id SERIAL PRIMARY KEY,
        original_user_id INT NOT NULL,
        substitute_user_id INT NOT NULL,
        assignment_id INT NOT NULL,
        FOREIGN KEY (original_user_id) REFERENCES User(user_id),
        FOREIGN KEY (substitute_user_id) REFERENCES User(user_id),
        FOREIGN KEY (assignment_id) REFERENCES ChoreAssignment(assignment_id)
    );

    CREATE TABLE ChoreDebt (
        debt_id SERIAL PRIMARY KEY,
        creditor_id INT NOT NULL,  -- the user who was originally scheduled for the chore
        debtor_id INT NOT NULL,    -- the user who covered the chore
        chore_id INT,
        amount_owed INT DEFAULT 0,
        FOREIGN KEY (creditor_id) REFERENCES User(user_id),
        FOREIGN KEY (debtor_id) REFERENCES User(user_id),
        FOREIGN KEY (chore_id) REFERENCES Chore(chore_id)
    );
  '''

  # Create users table if it doesn't exist
  cursor.executescript(statement)

  conn.commit()
  conn.close()

def initialize_test_database():
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()

  create_database()

  # insert 2 fake households and 4 fake users - remove after testing
  create_households = '''
    INSERT INTO Household (name) 
    VALUES 
    ('Home 1'),
    ('Home 2');
  '''
  
  cursor.execute(create_households)

  users = [
    ('Alice Anderson', 'alice.anderson@example.com', 'password1'),
    ('Bob Brown', 'bob.brown@example.com', 'password2'),
    ('Cindy Carson', 'cindy.carson@example.com', 'password3'),
    ('David Dawson', 'david.dawson@example.com', 'password4'),
    ('Eva Edwards', 'eva.edwards@example.com', 'password5'),
    ('Frank Foster', 'frank.foster@example.com', 'password6'),
    ('Grace Green', 'grace.green@example.com', 'password7'),
    ('Harry Hill', 'harry.hill@example.com', 'password8')
  ]

  cursor.executemany('INSERT INTO User (name, email, password) VALUES (?, ?, ?)', users)

  link_users_households = '''
    INSERT INTO UserHousehold (user_id, household_id)
    VALUES
      (1, 1),
      (2, 1),
      (3, 1),
      (4, 1),
      (5, 2),
      (6, 2),
      (7, 2),
      (8, 2);
  '''

  cursor.execute(link_users_households)

  # Create chores for each household
  create_chores = '''
    INSERT INTO Chore (household_id, name, description, frequency) 
    VALUES 
    (1, 'Vacuum Living Room', 'Vacuum the living room carpet.', 'weekly'),
    (1, 'Clean Kitchen', 'Wipe down counters and clean dishes.', 'daily'),
    (2, 'Mow Lawn', 'Mow the front and back lawn.', 'weekly'),
    (2, 'Take Out Trash', 'Take out the trash bins.', 'weekly');
  '''
  
  conn.commit()
  conn.close()

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

def add_chore(household_id, chore_name, description, recur_freq, _recur_days):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()
  cursor.execute('INSERT INTO Chore (household_id, name, description, recur_freq, _recur_days) VALUES (?, ?)', (household_id, chore_name, description, recur_freq, _recur_days))
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
  cursor.execute('INSERT INTO ChoreCompletion (assignment_id, completed_by, completed_at) VALUES (?, ?)', (assignment_id, user_id, completed_at))
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
  