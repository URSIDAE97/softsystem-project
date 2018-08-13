INSERT INTO TYPE (ID_TYPE, DISCIPLINE) VALUES (1, 'Piłka nożna');
INSERT INTO TYPE (ID_TYPE, DISCIPLINE) VALUES (2, 'Skoki narciarskie');
INSERT INTO TYPE (ID_TYPE, DISCIPLINE) VALUES (3, 'Piłka ręczna');

INSERT INTO ROLE (ROL_USER, NAME) VALUES (1, 'admin');

INSERT INTO USER (ID_USER, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD) VALUES (1, 'adadas@gmail.com', 'Marek', 'Snieżek', 'dupa');

INSERT INTO USER_ROLE (ID_USER, ROL_USER) VALUES (1, 1);

INSERT INTO MEMBER (ID_MEMBER, NAME, ID_TYPE) VALUES (1, 'Arka Gdynia', 1);
INSERT INTO MEMBER (ID_MEMBER, NAME, ID_TYPE) VALUES (2, 'Legia Warszawa', 1);

INSERT INTO EVENT (ID_EVENT, ACTIVE, BEGIN_DATE, END_DATE, NAME, RESULT, ID_TYPE) VALUES (1, true, to_date('2018-05-12','YYYY-MM-DD'), to_date('2018-06-19','YYYY-MM-DD'), 'Real-Barca', 'Remis', 1 );

INSERT INTO BET (ID_BET, AMOUNT, BET_RESULT, PRIZE, ID_EVENT, ID_USER) VALUES(1, 100, 'Wygrales', 200,1,1);