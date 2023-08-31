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
    const cartId = await getActiveCart(customer_id);
    console.log('cartid ', cartId);
    if(cartId.length > 0) {
        const query = `SELECT BOOK_ID FROM CARTITEMS WHERE CART_ID = :cid AND BOOK_ID = :b_id`;
        const binds = {
            cid: customer_id,
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
    const cartId = carts[0].ID;
    console.log(carts);
    console.log(cartId);
    if(cartId !== null) {
        const query = `INSERT INTO CARTITEMS(CART_ID, BOOK_ID) VALUES (:c_id, :b_id)`;
        binds = {
            c_id: customer_id,
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

module.exports = {
    getActiveCart,
    getItemsInCart,
    assignNewCart,
    isAlreadyAdded,
    addToCart
}