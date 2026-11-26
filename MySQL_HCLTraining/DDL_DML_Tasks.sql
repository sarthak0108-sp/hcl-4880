DROP DATABASE school_db;

CREATE DATABASE school_db;

USE school_db;
-- 3. Create students table
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL CHECK (name <> ''),
    email VARCHAR(100) UNIQUE,
    age INT CHECK (age >= 5),
    city VARCHAR(50) DEFAULT 'Delhi',
    admission_date DATE
);

-- 1. Create marks table with foreign key
CREATE TABLE marks (
    mark_id INT PRIMARY KEY,
    student_id INT,
    subject VARCHAR(30),
    score INT,
    FOREIGN KEY (student_id)
    REFERENCES students(student_id)
);

-- 2. Add phone column
ALTER TABLE students
ADD phone INT;

-- 3. Change phone datatype
ALTER TABLE students
MODIFY phone VARCHAR(15);

-- 4. Rename city to hometown
ALTER TABLE students
RENAME COLUMN city TO hometown;

-- 5. Create index on name
CREATE INDEX idx_name
ON students(name);

-- 6. Create backup of students structure
CREATE TABLE students_backup
LIKE students;

-- 7. Drop backup table
DROP TABLE students_backup;




-- 1. Insert one student
INSERT INTO students
(name, email, age, hometown, admission_date, phone)
VALUES
('Aman', 'aman@gmail.com', 18, 'Delhi', '2026-01-10', '9876543210');

-- 2. Insert five more students
INSERT INTO students
(name, email, age, hometown, admission_date, phone)
VALUES
('Rahul', 'rahul@gmail.com', 19, 'Noida', '2026-01-11', '9876543211'),
('Priya', 'priya@gmail.com', 15, 'Delhi', '2026-01-12', '9876543212'),
('Ankit', 'ankit@gmail.com', 14, 'Lucknow', '2026-01-13', '9876543213'),
('Neha', 'neha@gmail.com', 16, 'Delhi', '2026-01-14', '9876543214'),
('Rohit', 'rohit@gmail.com', 20, 'Noida', '2026-01-15', '9876543215');

-- 3. Insert 10 records into marks
INSERT INTO marks
(mark_id, student_id, subject, score)
VALUES
(1, 1, 'Maths', 75),
(2, 1, 'Science', 80),
(3, 2, 'Maths', 65),
(4, 2, 'English', 70),
(5, 3, 'Science', 85),
(6, 3, 'English', 55),
(7, 4, 'Maths', 15),
(8, 4, 'Science', 45),
(9, 5, 'English', 90),
(10, 6, 'Maths', 30);


SET SQL_SAFE_UPDATES = 0;

UPDATE marks
SET score = score + 5
WHERE subject = 'Maths';

SET SQL_SAFE_UPDATES = 1;

-- 2. Change hometown of student_id 2 to Noida
UPDATE students
SET hometown = 'Noida'
WHERE student_id = 2;

-- 3. Increase age of all Delhi students by 1
SET SQL_SAFE_UPDATES = 0;
UPDATE students
SET age = age + 1
WHERE hometown = 'Delhi';
SET SQL_SAFE_UPDATES = 1;

DELETE FROM marks
WHERE student_id = 6;

-- Now delete student
DELETE FROM students
WHERE student_id = 6;

-- 5. Delete all marks below 20
SET SQL_SAFE_UPDATES = 0;
DELETE FROM marks
WHERE score < 20;
SET SQL_SAFE_UPDATES = 1;


-- Display all students
SELECT * FROM students;

-- Display all marks
SELECT * FROM marks;

-- Check students table structure
DESC students;

-- Check marks table structure
DESC marks;

-- Display all tables
SHOW TABLES;
