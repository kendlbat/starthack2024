
INSERT INTO students (student_name) VALUES ('Alex Johnson');
INSERT INTO students (student_name) VALUES ('Maria Garcia');
INSERT INTO students (student_name) VALUES ('Liam Smith');

INSERT INTO Teachers (teacher_usr, teacher_name, teacher_email, teacher_pwd) VALUES ('jdoe', 'John Doe', 'john.doe@example.com', 'securepassword123');
INSERT INTO Teachers (teacher_usr, teacher_name, teacher_email, teacher_pwd) VALUES ('esmith', 'Ella Smith', 'ella.smith@example.com', 'mypassword456');


INSERT INTO SchoolClasses (class_name, class_year) VALUES ('Mathematics', 2024);
INSERT INTO SchoolClasses (class_name, class_year) VALUES ('History', 2024);

INSERT INTO Attendances (student_id, class_name, class_year) VALUES (1, 'Mathematics', 2024);
INSERT INTO Attendances (student_id, class_name, class_year) VALUES (2, 'History', 2024);
INSERT INTO Attendances (student_id, class_name, class_year) VALUES (3, 'Mathematics', 2024);

INSERT INTO Teaches (teacher_usr, class_name, class_year) VALUES ('jdoe', 'Mathematics', 2024);
INSERT INTO Teaches (teacher_usr, class_name, class_year) VALUES ('esmith', 'History', 2024);