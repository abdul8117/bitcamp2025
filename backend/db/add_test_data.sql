INSERT INTO Household (name) 
VALUES 
('Home 1'),
('Home 2');

INSERT INTO User (name, email, password)
VALUES
('Alice Anderson', 'alice.anderson@example.com', 'password1'),
('Bob Brown', 'bob.brown@example.com', 'password2'),
('Cindy Carson', 'cindy.carson@example.com', 'password3'),
('David Dawson', 'david.dawson@example.com', 'password4'),
('Eva Edwards', 'eva.edwards@example.com', 'password5'),
('Frank Foster', 'frank.foster@example.com', 'password6'),
('Grace Green', 'grace.green@example.com', 'password7'),
('Harry Hill', 'harry.hill@example.com', 'password8');

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
