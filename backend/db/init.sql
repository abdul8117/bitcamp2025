-- 1. Household: Represents a group of roommates
CREATE TABLE Household (
    household_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- 2. User: Represents an individual user (roommate)
CREATE TABLE User (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- 3. UserHousehold: Associates users with households (many-to-many)
CREATE TABLE UserHousehold (
    user_id INT NOT NULL,
    household_id INT NOT NULL,
    PRIMARY KEY (user_id, household_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (household_id) REFERENCES Household(household_id)
);

-- 4. Chore: Represents a chore with built-in recurrence settings
CREATE TABLE Chore (
    chore_id SERIAL PRIMARY KEY,
    household_id INT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    -- A simple recurrence frequency field. Allowed values could be 'never', 'daily', 'weekly',
    -- 'biweekly', 'monthly', 'yearly', or 'custom'
    recurrence_frequency TEXT NOT NULL CHECK (
        recurrence_frequency IN (
            'never',
            'daily',
            'weekly',
            'biweekly',
            'monthly',
            'yearly',
            'custom'
        )
    ),
    -- For custom recurrence: a comma-separated list of weekdays (e.g., 'Monday,Wednesday,Friday')
    recurrence_days TEXT,
    -- Optional start and end dates for the recurrence pattern
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (household_id) REFERENCES Household(household_id)
);

-- 5. ChoreAssignment: Represents an instance of a chore assigned for a specific day
CREATE TABLE ChoreAssignment (
    assignment_id SERIAL PRIMARY KEY,
    chore_id INT NOT NULL,
    assigned_date DATE NOT NULL,
    assigned_to INT NOT NULL,
    FOREIGN KEY (chore_id) REFERENCES Chore(chore_id),
    FOREIGN KEY (assigned_to) REFERENCES User(user_id)
);

-- 6. ChoreCompletion: Tracks when a chore instance has been completed
CREATE TABLE ChoreCompletion (
    completion_id SERIAL PRIMARY KEY,
    assignment_id INT NOT NULL,
    completed_by INT NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assignment_id) REFERENCES ChoreAssignment(assignment_id),
    FOREIGN KEY (completed_by) REFERENCES User(user_id)
);

-- 7. ChoreSubstitution: Logs when one roommate covers for another’s chore
CREATE TABLE ChoreSubstitution (
    substitution_id SERIAL PRIMARY KEY,
    original_user_id INT NOT NULL,
    substitute_user_id INT NOT NULL,
    assignment_id INT NOT NULL,
    FOREIGN KEY (original_user_id) REFERENCES User(user_id),
    FOREIGN KEY (substitute_user_id) REFERENCES User(user_id),
    FOREIGN KEY (assignment_id) REFERENCES ChoreAssignment(assignment_id)
);

-- 8. ChoreDebt: Tracks chore credits/debits between users due to substitutions
CREATE TABLE ChoreDebt (
    debt_id SERIAL PRIMARY KEY,
    creditor_id INT NOT NULL,  -- the user originally scheduled
    debtor_id INT NOT NULL,    -- the user who substituted
    chore_id INT,
    amount_owed INT DEFAULT 0,
    FOREIGN KEY (creditor_id) REFERENCES User(user_id),
    FOREIGN KEY (debtor_id) REFERENCES User(user_id),
    FOREIGN KEY (chore_id) REFERENCES Chore(chore_id)
);
