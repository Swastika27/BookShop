--TABLE 1 Admin
CREATE TABLE Admin (
	id NUMBER GENERATED BY DEFAULT AS IDENTITY,
	email VARCHAR2(100),
	password VARCHAR2(30)
);

--TABLE 2 Writer
CREATE TABLE Writer (
	ID   NUMBER GENERATED BY DEFAULT AS IDENTITY,
	Name VARCHAR2 ( 200 ) NOT NULL,
	Description VARCHAR2 ( 2000 ),
	Image VARCHAR2 ( 1000 ) DEFAULT 'https://commons.wikimedia.org/wiki/File:Male_Avatar.jpg',
	CONSTRAINT writer_pk PRIMARY KEY ( ID ) 
);

--TABLE 3 Publisher
CREATE TABLE Publisher ( 
	Name VARCHAR2 ( 200 ), 
	Address VARCHAR2 ( 500 ), 
	Email VARCHAR2 ( 60 ), 
	Password VARCHAR2 ( 30 ),
	CONSTRAINT publisher_pk PRIMARY KEY ( Name ) 
);

--TABLE 4 Book
CREATE TABLE Book (
	ID NUMBER GENERATED BY DEFAULT AS IDENTITY,
	Title VARCHAR2 ( 200 ) NOT NULL,
	Writer_ID NUMBER,
	Publisher VARCHAR2 ( 200 ),
	Date_Published NUMBER,
	Genre VARCHAR2 ( 150 ),
	Quantity_in_stock NUMBER,
	Quantity_sold NUMBER,
	Price NUMBER,
	Language VARCHAR2 ( 50 ),
	Description VARCHAR2 ( 2000 ),
	Rating NUMBER,
	Page NUMBER,
	Image VARCHAR2 ( 1000 ) DEFAULT 'https://www.vecteezy.com/png/9384332-old-vintage-book-clipart-design-illustration',
	CONSTRAINT book_pk PRIMARY KEY ( id ),
	CONSTRAINT writer_fk FOREIGN KEY ( Writer_id ) REFERENCES Writer ( id ),
	CONSTRAINT publisher_fk FOREIGN KEY ( Publisher ) REFERENCES Publisher ( Name ) 
);

--TABLE 5 Customers
CREATE TABLE Customers (
	id NUMBER GENERATED BY DEFAULT AS idENTITY ( START WITH 1 INCREMENT BY 1 ),
	customer_name VARCHAR2 ( 100 ),
	customer_addr VARCHAR2 ( 300 ),
	customer_email VARCHAR2 ( 100 ),
	customer_password VARCHAR2 ( 1000 ),
	phone_no VARCHAR2 ( 15 ),
	CONSTRAINT customer_pk PRIMARY KEY ( id ) 
);

--TABLE 6 Ratings
CREATE TABLE Ratings (	
	Customer_ID NUMBER,
	Book_ID NUMBER,
	Rating NUMBER NOT NULL,
	CONSTRAINT rates_user_id_fk FOREIGN KEY ( Customer_ID ) REFERENCES Customers ( ID ),
	CONSTRAINT rates_book_id_fk FOREIGN KEY ( Book_ID ) REFERENCES Book ( ID ) 
);

--TABLE 7 Reviews
CREATE TABLE Reviews (
	Customer_ID NUMBER,
	Book_ID NUMBER,
	Review VARCHAR2 ( 1500 ) NOT NULL,
	CONSTRAINT reviews_user_id_fk FOREIGN KEY ( Customer_ID ) REFERENCES Customers ( ID ),
	CONSTRAINT reviews_book_id_fk FOREIGN KEY ( Book_ID ) REFERENCES Book ( ID ) 
);

--TABLE 8 CartCustomers
CREATE Table CartCustomers (
	id NUMBER GENERATED BY DEFAULT AS IDENTITY ,
	customer_id NUMBER,
	isActive Char(1) DEFAULT 'y' CHECK (isActive in ('y', 'n')),
	CONSTRAINT cart_customer_cart_id_pk PRIMARY KEY (id),
	CONSTRAINT cart_customer_customer_id_fk FOREIGN KEY (customer_id) REFERENCES Customers(id)
);

--TABLE 9 CartItems
CREATE TABLE CartItems (
	cart_id NUMBER,
	book_id NUMBER,
	quantity NUMBER DEFAULT 1,
	CONSTRAINT cart_item_pk PRIMARY KEY (cart_id, book_id),
	CONSTRAINT cart_item_cart_id_fk FOREIGN KEY (cart_id) REFERENCES Customers(id),
	CONSTRAINT cart_item_book_id_fk FOREIGN KEY (book_id) REFERENCES Book(id)
);

--TABLE 10 Wishlists
CREATE TABLE WishLists (
	customer_id NUMBER,
	book_id NUMBER,
	CONSTRAINT wishlist_customer_id_fk FOREIGN Key ( customer_id ) References customers ( id ),
	CONSTRAINT wishlist_book_id_fk FOREIGN Key ( book_id ) References Book ( id ),
	CONSTRAINT wishlist_pk PRIMARY Key ( customer_id, book_id ) 
);

--TABLE 11 Supplies
CREATE TABLE Supplies (
	publisher VARCHAR2 ( 200 ),
	book_id NUMBER,
	Price NUMBER,
	quantity NUMBER,
	payment_status VARCHAR2(50) DEFAULT 'pending',
	date_delivered DATE,
	CONSTRAINT supplies_publisher_fk FOREIGN Key ( publisher ) References Publisher ( Name ),
	CONSTRAINT supplies_book_id_fk FOREIGN KEY ( book_id ) References Book ( id ),
	CONSTRAINT Supplies_pk PRIMARY Key ( publisher, book_id, date_delivered ) 
);

--TABLE 12 Orders
CREATE TABLE Orders (
	cart_id NUMBER,
	date_ordered DATE NOT NULL,
	payment_status VARCHAR2(50) DEFAULT 'pending',
	date_delivered DATE,
	CONSTRAINT orders_cart_id_fk FOREIGN KEY ( cart_id ) REFERENCES CartCustomers ( id ),
	CONSTRAINT orders_pk PRIMARY KEY ( cart_id ) 
);

---creating new table with writer id 
CREATE TABLE Book_and_Writer (
 BOOK_ID NUMBER,
 WRITER_ID NUMBER,
 CONSTRAINT book_writer_pk PRIMARY KEY ( BOOK_ID )
); 

--inserting the book id and writer id in the new table 
INSERT INTO ROKOMARI.BOOK_AND_WRITER (BOOK_ID, WRITER_ID)
SELECT ID, WRITER_ID 
FROM BOOK;
