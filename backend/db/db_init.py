import sqlite3

DB_NAME = 'database.db'

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

  with open('schema.sql', 'r') as file:
    schema = file.read()

  # Create users table if it doesn't exist
  cursor.executescript(schema)

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
    ('Oakland'),
    ('UView');
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

if __name__ == "__main__":
  initialize_test_database()
  print("Database initialized successfully.")