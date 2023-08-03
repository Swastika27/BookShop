--1 TABLE: Writer
CREATE TABLE Writer (
	ID NUMBER GENERATED ALWAYS AS IDENTITY ( START WITH 100 INCREMENT BY 1 ),
	Name VARCHAR2 ( 200 ) NOT NULL,
	Description VARCHAR2 ( 2000 ),
	Image VARCHAR2 ( 1000 ),
	CONSTRAINT writer_pk PRIMARY KEY ( ID ) 
);
--2 TABLE: Publisher
CREATE TABLE Publisher ( Name VARCHAR2 ( 200 ), Address VARCHAR2 ( 500 ), CONSTRAINT publisher_pk PRIMARY KEY ( Name ) );
--3 TABLE: Book
CREATE TABLE Book (
	ID NUMBER GENERATED ALWAYS AS IDENTITY ( START WITH 1 INCREMENT BY 1 ),
	Title VARCHAR2 ( 200 ),
	Writer_ID NUMBER,
	Publisher VARCHAR2 ( 200 ),
	Date_Published DATE,
	Genre VARCHAR2 ( 50 ),
	Quantity_in_stock NUMBER,
	Quantity_sold NUMBER,
	Price NUMBER,
	Language VARCHAR2 ( 50 ),
	Description VARCHAR2 ( 2000 ),
	Rating NUMBER,
	Image VARCHAR2 ( 1000 ),--default image
	CONSTRAINT book_pk PRIMARY KEY ( ID ),
	CONSTRAINT writer_fk FOREIGN KEY ( Writer_ID ) REFERENCES Writer ( ID ),
	CONSTRAINT publisher_fk FOREIGN KEY ( Publisher ) REFERENCES Publisher ( Name ) 
);
--4 TABLE: USERS
CREATE TABLE Users (
	ID NUMBER GENERATED ALWAYS AS IDENTITY ( START WITH 1 INCREMENT BY 1 ),
	user_name VARCHAR2 ( 100 ),
	user_addr VARCHAR2 ( 300 ),
	user_email VARCHAR2 ( 100 ),
	password VARCHAR2 ( 1000 ),
	user_role VARCHAR2 ( 30 ),
	phone_no VARCHAR2 ( 15 ),
	CONSTRAINT user_pk PRIMARY KEY ( ID ) 
);
--5 Table: Ratings
CREATE TABLE Ratings (
	Book_ID NUMBER,
	User_ID NUMBER,
	Ratings NUMBER,
	CONSTRAINT rates_user_id_fk FOREIGN KEY ( User_ID ) REFERENCES Users ( ID ),
	CONSTRAINT rates_book_id_fk FOREIGN KEY ( Book_ID ) REFERENCES Book ( ID ) 
);
--6 TABLE: Reviews
CREATE TABLE Reviews (
	Book_ID NUMBER,
	User_ID NUMBER,
	Review VARCHAR2 ( 1500 ) NOT NULL,
	CONSTRAINT reviews_user_id_fk FOREIGN KEY ( User_ID ) REFERENCES Users ( ID ),
	CONSTRAINT reviews_book_id_fk FOREIGN KEY ( Book_ID ) REFERENCES Book ( ID ) 
);
--7 TAble: Cart
CREATE TABLE Cart (
	Cart_id NUMBER GENERATED ALWAYS AS IDENTITY ( START WITH 1 INCREMENT BY 1 ),
	user_id NUMBER,
	book_id NUMBER,
	quantity NUMBER,
	CONSTRAINT cart_pk PRIMARY KEY ( Cart_id ),
	CONSTRAINT cart_book_id_fk FOREIGN Key ( book_id ) REFERENCES Book ( ID ),
	Constraint cart_user_id_fk Foreign Key ( user_id ) References Users ( ID ) 
);
--8 Table: Wishlist
CREATE TABLE WishLists (
	user_id NUMBER,
	book_id NUMBER,
	CONSTRAINT wishlist_user_id_fk FOREIGN Key ( user_id ) References USERs ( ID ),
	CONSTRAINT wishlist_book_id_fk FOREIGN Key ( book_id ) References Book ( ID ),
	CONSTRAINT wishlist_pk PRIMARY Key ( user_id, book_id ) 
);
--9 Table: Supplies
CREATE TABLE Supplies (
	publisher VARCHAR2 ( 200 ),
	book_id NUMBER,
	Price NUMBER,
	quantity NUMBER,
	CONSTRAINT supplies_publisher_fk FOREIGN Key ( publisher ) References Publisher ( Name ),
	CONSTRAINT supplies_book_id_fk FOREIGN KEY ( book_id ) References Book ( ID ),
	CONSTRAINT Supplies_pk PRIMARY Key ( publisher, book_id ) 
);
--10 Table: Orders
CREATE TABLE Orders (
	user_id NUMBER,
	cart_id NUMBER,
	date_ordered DATE NOT NULL,
	date_delivered DATE,
	CONSTRAINT orders_buyer_fk FOREIGN KEY ( user_id ) REFERENCES USERS ( ID ),
	CONSTRAINT orders_cart_id_fk FOREIGN KEY ( cart_id ) REFERENCES Cart ( Cart_id ),
CONSTRAINT orders_pk PRIMARY KEY ( user_id, cart_id ) 
);