DROP TABLE IF EXISTS Students CASCADE;
DROP TABLE IF EXISTS Teachers CASCADE;
DROP TABLE IF EXISTS SchoolClasses CASCADE;
DROP TABLE IF EXISTS Attendances CASCADE;
DROP TABLE IF EXISTS Teaches CASCADE;
DROP TABLE IF EXISTS Documents CASCADE;
DROP TABLE IF EXISTS Gradings CASCADE;

CREATE TABLE Students (
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(100)
);

CREATE TABLE Teachers (
    teacher_usr VARCHAR(50) PRIMARY KEY,
    teacher_name VARCHAR(100) NOT NULL,
    teacher_email VARCHAR(50) UNIQUE,
    teacher_pwd VARCHAR(150) NOT NULL
);

CREATE TABLE SchoolClasses (
    class_name VARCHAR(50),
    class_year INT,

    CONSTRAINT pk_schoolclasses PRIMARY KEY(class_name,class_year)
);

CREATE TABLE Attendances (
    student_id INT REFERENCES Students(student_id),
    class_name VARCHAR(50),
    class_year INT,

    CONSTRAINT pk_attendances PRIMARY KEY(student_id,class_name,class_year),
    CONSTRAINT fk_attendances_sc FOREIGN KEY (class_name, class_year) REFERENCES SchoolClasses(class_name,class_year)
);

CREATE TABLE Teaches (
    teacher_usr VARCHAR(50) REFERENCES Teachers(teacher_usr),
    class_name VARCHAR(50),
    class_year INT,

    CONSTRAINT pk_teaches PRIMARY KEY(teacher_usr,class_name,class_year),
    CONSTRAINT fk_teaches_sc FOREIGN KEY (class_name, class_year) REFERENCES SchoolClasses(class_name,class_year)
);

CREATE TABLE Documents (
    document_id SERIAL PRIMARY KEY,
    student_id INT,
    class_name VARCHAR(50),
    class_year INT,
    doc_date DATE,
    doc_blob BYTEA,

    CONSTRAINT fk_documents_at FOREIGN KEY (class_name, class_year, student_id) REFERENCES Attendances(class_name,class_year,student_id)
);

CREATE TABLE Gradings (
    grading_id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    class_name VARCHAR(50) NOT NULL,
    class_year INT NOT NULL,
    teacher_usr VARCHAR(50) REFERENCES Teachers(teacher_usr),
    document_id INT REFERENCES Documents(document_id),

    subject_name VARCHAR(30) NOT NULL,
    test_nr INT NOT NULL,
    task_nr VARCHAR(50),
    learning_goal VARCHAR(100),
    goal_result INT CHECK(goal_result >= 1 AND goal_result <=7) NOT NULL,
    weights REAL DEFAULT 1,
    comment VARCHAR(500),

   CONSTRAINT fk_gradings_at FOREIGN KEY (class_name, class_year, student_id) REFERENCES Attendances(class_name,class_year,student_id)
);

COMMIT;