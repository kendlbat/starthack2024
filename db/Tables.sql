-- Table for 'Students'
CREATE TABLE Students (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(100),
    -- Add more student-specific fields here
);

-- Table for 'Teachers'
CREATE TABLE Teachers (
    teacher_usr VARCHAR(50) PRIMARY KEY,
    teacher_name VARCHAR(100) NOT NULL,
    teacher_email VARCHAR(50) UNIQUE,
    teacher_pwd VARCHAR(150) NOT NULL
    -- Add more teacher-specific fields here
);

-- Table for 'SchoolClasses'
CREATE TABLE SchoolClasses (
    class_name VARCHAR(50) PRIMARY KEY,
    class_year INT PRIMARY KEY

);

-- Table for 'Attendances'
CREATE TABLE Attendances (
    student_id INT REFERENCES Students(student_id) PRIMARY KEY,
    class_name VARCHAR(50) REFERENCES SchoolClasses(class_name,class_year) PRIMARY KEY,
    class_year INT REFERENCES SchoolClasses(class_name,class_year) PRIMARY KEY
);

CREATE TABLE Teaches(
    teacher_usr VARCHAR(50) REFERENCES Teachers(teacher_usr) PRIMARY KEY,
    class_name VARCHAR(50) REFERENCES SchoolClasses(class_name,class_year) PRIMARY KEY,
    class_year INT REFERENCES SchoolClasses(class_name,class_year) PRIMARY KEY
);


-- Table for 'Documents'
CREATE TABLE Documents (
    document_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES Students(student_id),
    class_name VARCHAR(50) REFERENCES SchoolClasses(class_name,class_year) PRIMARY KEY,
    class_year INT REFERENCES SchoolClasses(class_name,class_year) PRIMARY KEY,
    doc_date DATE,
    doc_blob BYTEA 
);


-- Table for 'Gradings'
CREATE TABLE Gradings (
    grading_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES Students(student_id),
    class_name INT REFERENCES SchoolClasses(class_name,class_year),
    class_year INT REFERENCES SchoolClasses(class_name,class_year),
    teacher_usr VARCHAR(50) REFERENCES Teachers(teacher_usr),
    document_id INT REFERENCES Documents(document_id),

    subject_name VARCHAR(30) NOT NULL,
    test_nr INT NOT NULL,
    task_nr VARCHAR(50),
    learning_goal VARCHAR(100),
    goal_result INT CHECK(goal_result >= 1 AND goal_result >=7) NOT NULL,
    weights REAL,
    comment VARCHAR(500)

);

COMMIT;