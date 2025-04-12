import sqlite3

DB_NAME = 'database.db'

def create_database():
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()

  # delete the database if it exists
  cursor.execute('DROP TABLE IF EXISTS users')
  conn.commit()

  statement = '''
        CREATE TABLE User (
            user_id SERIAL PRIMARY KEY,
            household_id INT NOT NULL,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            is_active BOOLEAN DEFAULT TRUE,
            FOREIGN KEY (household_id) REFERENCES Household(household_id)
        );

        CREATE TABLE Household (
            household_id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );

        CREATE TABLE Chore (
            chore_id SERIAL PRIMARY KEY,
            household_id INT NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            frequency TEXT,  -- e.g. "daily", "weekly"
            FOREIGN KEY (household_id) REFERENCES Household(household_id)
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
  cursor.execute(statement)

  conn.commit()
  conn.close()

def initialize_database():
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()

  create_database()

  # insert 4 fake users - remove after testing
  add_user('user1', 'password1')
  add_user('user2', 'password2')
  add_user('user3', 'password3')
  add_user('user4', 'password4')

  conn.commit()
  conn.close()

def add_user(username, password):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()

  # Create users table if it doesn't exist
  cursor.execute('''
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL
      )
  ''')

  # Insert a new user into the users table
  cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', ('testuser', 'testpassword'))
  conn.commit()
  conn.close()

def get_user(username):
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()

  # Retrieve the user from the users table
  cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
  user = cursor.fetchone()
  conn.close()

  return user