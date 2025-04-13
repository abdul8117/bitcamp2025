------------------------------------------------------------------------------
-- 1) User
------------------------------------------------------------------------------
CREATE TABLE User (
    user_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name      TEXT NOT NULL,
    email     TEXT UNIQUE NOT NULL,
    password  TEXT NOT NULL
);

------------------------------------------------------------------------------
-- 2) Household
------------------------------------------------------------------------------
CREATE TABLE Household (
    household_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT NOT NULL,
    group_id     TEXT NOT NULL,  -- e.g. random num for users to join household
);

------------------------------------------------------------------------------
-- 3) UserHousehold (relationship table)
------------------------------------------------------------------------------
CREATE TABLE UserHousehold (
    user_id      INT NOT NULL,
    household_id INT NOT NULL,
    PRIMARY KEY (user_id, household_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (household_id) REFERENCES Household(household_id)
);

------------------------------------------------------------------------------
-- 4) ChoreRecurrence
------------------------------------------------------------------------------
CREATE TABLE ChoreRecurrence (
    recurrence_id   INTEGER PRIMARY KEY AUTOINCREMENT,
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
    custom_rule     TEXT,      -- can hold advanced or non-standard patterns
    start_date      DATE,      -- when recurrence begins (optional)
    end_date        DATE,      -- when recurrence ends (optional)
    days_of_week    TEXT,      -- e.g. "MON,WED,FRI" or JSON like '["MON","WED","FRI"]'
    days_of_month   TEXT,      -- e.g. "1,15,31" or JSON like '[1,15,31]'
    next_occurrence DATE       -- helps track the next time the chore is due
);

------------------------------------------------------------------------------
-- 5) Chore
------------------------------------------------------------------------------
CREATE TABLE Chore (
    chore_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    household_id  INT NOT NULL,
    name          TEXT NOT NULL,
    description   TEXT,
    recurrence_id INT,  -- optional reference to a recurrence rule
    FOREIGN KEY (household_id) REFERENCES Household(household_id),
    FOREIGN KEY (recurrence_id) REFERENCES ChoreRecurrence(recurrence_id)
);

------------------------------------------------------------------------------
-- 6) ChoreAssignment
------------------------------------------------------------------------------
CREATE TABLE ChoreAssignment (
    assignment_id  INTEGER PRIMARY KEY AUTOINCREMENT,
    chore_id       INT NOT NULL,
    assigned_date  DATE NOT NULL,
    assigned_to    INT NOT NULL,
    FOREIGN KEY (chore_id) REFERENCES Chore(chore_id),
    FOREIGN KEY (assigned_to) REFERENCES User(user_id)
);

------------------------------------------------------------------------------
-- 7) ChoreCompletion
------------------------------------------------------------------------------
CREATE TABLE ChoreCompletion (
    completion_id  INTEGER PRIMARY KEY AUTOINCREMENT,
    assignment_id  INT NOT NULL,
    completed_by   INT NOT NULL,
    completed_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assignment_id) REFERENCES ChoreAssignment(assignment_id),
    FOREIGN KEY (completed_by)  REFERENCES User(user_id)
);

------------------------------------------------------------------------------
-- 8) ChoreSubstitution
------------------------------------------------------------------------------
CREATE TABLE ChoreSubstitution (
    substitution_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    original_user_id  INT NOT NULL,
    substitute_user_id INT NOT NULL,
    assignment_id     INT NOT NULL,
    FOREIGN KEY (original_user_id)   REFERENCES User(user_id),
    FOREIGN KEY (substitute_user_id) REFERENCES User(user_id),
    FOREIGN KEY (assignment_id)      REFERENCES ChoreAssignment(assignment_id)
);

------------------------------------------------------------------------------
-- 9) ChoreDebt
------------------------------------------------------------------------------
CREATE TABLE ChoreDebt (
    debt_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    creditor_id INT NOT NULL,  -- the user who was originally scheduled
    debtor_id   INT NOT NULL,  -- the user who covered the chore
    chore_id    INT,
    amount_owed INT DEFAULT 0,
    FOREIGN KEY (creditor_id) REFERENCES User(user_id),
    FOREIGN KEY (debtor_id)   REFERENCES User(user_id),
    FOREIGN KEY (chore_id)    REFERENCES Chore(chore_id)
);

------------------------------------------------------------------------------
-- 10) Pet
------------------------------------------------------------------------------
CREATE TABLE Pet (
    pet_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id  INTEGER NOT NULL,
    pet_type TEXT NOT NULL CHECK (pet_type IN ('duckling', 'dove', 'swan')),
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);