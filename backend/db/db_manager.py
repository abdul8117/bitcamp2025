import sqlite3

DB_NAME = 'database.db'

def create_database():
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()

  # delete the database if it exists
  cursor.execute('DROP TABLE IF EXISTS users')
  conn.commit()

  # Create users table if it doesn't exist
  cursor.execute('''
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL
      )
  ''')

  conn.commit()
  conn.close()

def create_database():
  conn = sqlite3.connect(DB_NAME)
  cursor = conn.cursor()

  create_database()

  # insert 4 fake users
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