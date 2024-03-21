DROP TABLE numberplate CASCADE CONSTRAINTS;
DROP TABLE gate CASCADE CONSTRAINTS;

DROP SEQUENCE sq_gate_id;
DROP SEQUENCE sq_numberplate_id;


CREATE SEQUENCE sq_gate_id;
CREATE SEQUENCE sq_numberplate_id;

CREATE TABLE gate (
    id    INTEGER,
    mac   VARCHAR2(20)  NOT NULL,
    topic VARCHAR2(200) NOT NULL,

    CONSTRAINT pk_gate   PRIMARY KEY(id),
    CONSTRAINT uq_mac    UNIQUE(mac),
    CONSTRAINT uq_topic  UNIQUE(topic)
);

CREATE TABLE numberplate (
    id          INTEGER,
    gate_id     INTEGER      NOT NULL,
    numberplate VARCHAR2(20) NOT NULL,
    startdate   DATE,
    enddate     DATE,

    CONSTRAINT pk_numberplate PRIMARY KEY(id),
    CONSTRAINT uq_np_gate     UNIQUE(gate_id,numberplate),
    CONSTRAINT fk_np_gate     FOREIGN KEY(gate_id) REFERENCES gate(id)
);

INSERT INTO gate VALUES(sq_gate_id.NEXTVAL,'maingate','/htlvil/5b/init/teame/gate/maingate');
INSERT INTO gate VALUES(sq_gate_id.NEXTVAL,'soutgate','/htlvil/5b/init/teame/gate/southgate');
INSERT INTO gate VALUES(sq_gate_id.NEXTVAL,'westgate','/htlvil/5b/init/teame/gate/westgate');

INSERT INTO NUMBERPLATE VALUES(sq_numberplate_id.NEXTVAL,1,'DEF1011',to_date('2023-12-01' default null on conversion error, 'YYYY-MM-dd'),to_date('2023-12-07' default null on conversion error, 'YYYY-MM-dd'));
INSERT INTO NUMBERPLATE VALUES(sq_numberplate_id.NEXTVAL,2,'SQL2323',to_date('2024-03-23' default null on conversion error, 'YYYY-MM-dd'),to_date('2026-12-07' default null on conversion error, 'YYYY-MM-dd'));
INSERT INTO NUMBERPLATE VALUES(sq_numberplate_id.NEXTVAL,3,'HUN1823',to_date('2023-12-24' default null on conversion error, 'YYYY-MM-dd'),to_date('2023-12-31' default null on conversion error, 'YYYY-MM-dd'));
INSERT INTO NUMBERPLATE VALUES(sq_numberplate_id.NEXTVAL,1,'GHI9832',to_date('2023-12-01' default null on conversion error, 'YYYY-MM-dd'),to_date('2050-01-01' default null on conversion error, 'YYYY-MM-dd'));

COMMIT;