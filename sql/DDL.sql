--1 TABLE: Writer 
CREATE TABLE Writer(
  ID NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 100 INCREMENT BY 1) 
  Name VARCHAR2(200) NOT NULL
  Description VARCHAR2(2000)
  Image VARCHAR2(1000) --Default image to be added
  CONSTRAINT writer_pk PRIMARY KEY(ID)
);

--2 TABLE: Publisher 
CREATE TABLE Publisher( 
  Name VARCHAR2(200)
  Address VARCHAR2(500)
  CONSTRAINT publisher_pk PRIMARY KEY(Name)
);

--3 TABLE: Book
CREATE TABLE Book(
  ID NUMBER GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) 
  Title VARCHAR2(200)
  Writer_ID NUMBER
  Publisher VARCHAR2(200)
  Date_Published DATE
  Genre VARCHAR2(50)
  Quantity_in_stock NUMBER
  Quantity_sold NUMBER
  Price NUMBER
  Language VARCHAR2(50)
  Description VARCHAR2(2000)
  Rating NUMBER
  Image VARCHAR2(1000) --default image
  CONSTRAINT book_pk PRIMARY KEY(ID)
  CONSTRAINT writer_fk FOREIGN KEY(Writer_ID) REFERENCES Writer(ID)
  CONSTRAINT publisher_fk FOREIGN KEY(Publisher) REFERENCES Publisher(Name)  
);

--4 TABLE: Rates 
CREATE TABLE Rates(
  Book_ID NUMBER
  User_ID NUMBER
  Rating NUMBER
  CONSTRAINT rates_user_id_fk FOREIGN KEY(User_ID) REFERENCES User(ID)
  CONSTRAINT rates_book_id_fk FOREIGN KEY(Book_ID) REFERENCES Book(ID)   
);

--5 TABLE: Reviews
CREATE TABLE Reviews(
  Book_ID NUMBER
  User_ID NUMBER
  Review VARCHAR2(1500) NOT NULL
  CONSTRAINT reviews_user_id_fk FOREIGN KEY(User_ID) REFERENCES User(ID)
  CONSTRAINT reviews_book_id_fk FOREIGN KEY(Book_ID) REFERENCES Book(ID)   
);

--6 TABLE: USER 
CREATE TABLE User (
  ID NUMBER GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT BY 1)
  name VARCHAR2(100)
  Address VARCHAR2(300)
  email VARCHAR2(100)
  password VARCHAR2(1000)
  role VARCHAR2(30)
  phone_no VARCHAR2(15)
  CONSTRAINT user_pk PRIMARY KEY(ID) 
)

--7 TAble: Cart
CREATE TAble Cart (
  Cart_id NUMBER GENERATED ALWAYS AS IDENTITY(START WITH 1 INCREMENT By 1)
  book_id NUMBER
  quantity NUMBER
  CONSTRAINT cart_pk PRIMARY KEY (Cart_id)
  CONSTRAINT cart_book_id_fk FOREIGN Key REFERENCES Book(ID)
)

--8 Table: Order
CREATE Table Order (
  buyer_id NUMBER
  cart_id NUMBER 
  date_ordered DATE 
  date_delivered Date 
  CONSTRAINT buyer_fk FOREIGN Key REFERENCES USER(ID)
  CONSTRAINT cart_id_fk FOREIGN KEY REFERENCES Cart(Cart_id)
  CONSTRAINT order_pk PRIMARY KEY (buyer_id, cart_id)
)

--9 Table: Wishlist 
CREATE Table WishList (
  user_id NUMBER
  book_id NUMBER 
  CONSTRAINT user_id_fk FOREIGN Key References User(ID)
  CONSTRAINT book_id_fk FOREIGN Key References Book(ID)
  CONSTRAINT wishlist_pk PRIMARY Key (user_id, book_id)
)

--10 Table: Supplies 
CREATE Table Supplies (
  publisher VARCHAR2
  book_id NUMBER
  Price NUMBER 
  quantity NUMBER 
  CONSTRAINT publisher_fk FOREIGN Key References Publisher(Name)
  CONSTRAINT book_id_fk FOREIGN KEY References Book(ID)
  CONSTRAINT Supplies_pk PRIMARY Key (publisher, book_id)
)