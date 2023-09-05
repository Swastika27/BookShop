const database = require('./database');

async function getActiveCart(c_id) {
    const query = `SELECT ID FROM CARTCUSTOMERS
    WHERE CUSTOMER_ID = :id AND ISACTIVE = 'y'`;
    const binds = {
        id: c_id
    };
    console.log('get active carts');
    return (await database.execute(query, binds, database.options)).rows;
}

async function getItemsInCart(cart_id) {
    const query = `SELECT BOOK_ID, QUANTITY FROM CARTITEMS WHERE CART_ID = :id`;
    const binds = {
        id: cart_id
    };
    return (await database.execute(query, binds, database.options)).rows;
}

async function assignNewCart(customer_id) {
    const query = `INSERT INTO CARTCUSTOMERS(CUSTOMER_ID) VALUES (:ID)`;
    const binds = {
        id: customer_id
    };
    console.log('new cart assigned');
    return (await database.execute(query, binds, database.options)).rows;
}

async function isAlreadyAdded(customer_id, book_id) {
    console.log('is already added');
    const cartId = await getActiveCart(customer_id);
    console.log('cartid ', cartId);
    if(cartId.length > 0) {
        const query = `SELECT BOOK_ID FROM CARTITEMS WHERE CART_ID = :cid AND BOOK_ID = :b_id`;
        const binds = {
            cid: cartId[0].ID,
            b_id: book_id
        };
        const data = await database.execute(query, binds, database.options);
        console.log(data);
        if (data.rows.length > 0) {
            return data.rows;
        }
        return null;
    }
}

async function addToCart(customer_id, book_id) {
    const carts = await getActiveCart(customer_id);
    console.log(carts);
    const cartId = carts[0].ID;
    console.log(cartId);
    if(cartId !== null) {
        const query = `INSERT INTO CARTITEMS(CART_ID, BOOK_ID) VALUES (:c_id, :b_id)`;
        binds = {
            c_id: cartId,
            b_id: book_id
        };
        console.log('query, ', query);
        console.log('binds', binds);
        console.log('options ', database.options);
        const updateResult = await database.execute(query, binds, database.options);
        console.log('added to cadrt');
        return;
    }
    else {
        console.log('cart not found');
    }
}

async function getCartAllInfoFromId(user_id) {
    const query = `SELECT Book.ID, BOOK.TITLE, WRITER.NAME, BOOK.PRICE, Book.QuantiTY_IN_STOCK as Stock, CARTITEMS.QUANTITY
                    FROM CARTITEMS JOIN BOOK ON (CARTITEMS.BOOK_ID = BOOK.ID)
                    JOIN WRITER ON (BOOK.WRITER_ID = WRITER.ID) 
                    JOIN CARTCUSTOMERS ON (CARTITEMS.Cart_ID = CARTCUSTOMERS.ID AND CARTCUSTOMERS.ISACTIVE LIKE 'y')
                    WHERE CARTCUSTOMERS.CUSTOMER_ID = :ID`;
    const binds = {
        ID: user_id
    }

    return (await database.execute(query, binds, database.options)).rows;
}

async function updateQuantity(book_id, quantity, user_id) {
    const cart_id = await getActiveCart(user_id);
    console.log(cart_id[0].ID);
    const query = `UPDATE CARTITEMS SET QUANTITY = :new_qty
                    where book_id = :b_id and cart_id = :c_id`;
    const binds = {
        new_qty: quantity,
        b_id: book_id,
        c_id: cart_id[0].ID
    }
    return (await database.execute(query, binds, database.options)).rows;

}

async function deleteBookFromCart(book_id, user_id) {
    const cart_id = await getActiveCart(user_id);
    const query = `DELETE FROM CARTITEMS 
                    WHERE BOOK_ID = :b_id AND CART_ID = :c_id`;
    const binds = {
        b_id: book_id,
        c_id: cart_id[0].ID
    };

    return (await database.execute(query, binds, database.options)).rows;

}
module.exports = {
    getActiveCart,
    getItemsInCart,
    assignNewCart,
    isAlreadyAdded,
    addToCart,
    getCartAllInfoFromId,
    updateQuantity,
    deleteBookFromCart
}