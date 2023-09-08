const database = require('./database');

async function getAllOrders () {
    const query = `SELECT ORDERS.CART_ID, to_char(DATE_ORDERED, 'MM-DD-YYYY') as date_ordered, PAYMENT_STATUS, TO_CHAR(DATE_DELIVERED, 'YYYY-MM-DD') AS DATE_DELIVERED,CUSTOMER_ADDR, CUSTOMER_ID, PHONE_NO, TOTAL_QUANTITY, TOTAL_PRICE
                    FROM ORDERS 
                    JOIN CARTCUSTOMERS
                    ON ID = CART_ID
                    JOIN (
                        SELECT CART_ID, SUM(QUANTITY) AS TOTAL_QUANTITY, SUM(QUANTITY * PRICE) AS TOTAL_PRICE
                        FROM CARTITEMS 
                        JOIN ( SELECT ID, PRICE 
                            FROM BOOK
                            ) B
                        ON BOOK_ID = B.ID
                        GROUP BY CART_ID
                    ) R ON R.CART_ID = ORDERS.CART_ID`;

    const binds = {

    }
    return (await database.execute(query, binds, database.options)).rows;
}

async function updateDeliveryDate(cart_id, del_date) {
    const query = `UPDATE ORDERS SET DATE_DELIVERED = to_date(:D_DATE, 'yyyy-mm-dd')
                    WHERE CART_ID = :ID`;
    const binds = {
        d_date: del_date,
        id: cart_id
    }
    return (await database.execute(query, binds, database.options)).rows;

}
async function updatePaymentStatus(cart_id, payment_status) {
    const query = `UPDATE ORDERS SET PAYMENT_STATUS = :STATUS
                    WHERE CART_ID = :ID`;
    const binds = {
        status: payment_status,
        id: cart_id
    }
    return (await database.execute(query, binds, database.options)).rows;

}

module.exports = {
    getAllOrders,
    updateDeliveryDate,
    updatePaymentStatus
}
