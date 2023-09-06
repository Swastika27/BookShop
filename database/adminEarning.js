const database = require('./database');

async function getEarningByMonth() {
    const query = `SELECT TO_CHAR(ORDERS.DATE_DELIVERED, 'YYYY-MM') AS YEARMONTH, SUM(CARTITEMS.QUANTITY) AS TOTAL_SOLD, SUM(CARTITEMS.QUANTITY*BOOK.PRICE) AS TOTAL_EARNING
                    FROM CARTITEMS, BOOK
                    WHERE (BOOK.ID IN (
                        SELECT CARTITEMS.BOOK_ID 
                        FROM CARTITEMS
                        WHERE (CARTITEMS.CART_ID IN (
                            SELECT CART_ID
                            FROM ORDERS
                            WHERE (TOUPPER(PAYMENT_STATUS) = 'PAID')
                        )
                        )
                    ))
                    GROUP BY TO_CHAR(ORDERS.DATE_DELIVERED, 'YYYY-MM')
                    ORDER BY YEARMONTH`;
    const binds = {}
    return (await database.execute(query, binds, database.options)).rows;
}

async function getYearlyEarning() {
    const query = `SELECT TO_CHAR(ORDERS.DATE_DELIVERED, 'YYYY') AS YEAR, SUM(CARTITEMS.QUANTITY) AS TOTAL_SOLD, SUM(CARTITEMS.QUANTITY*BOOK.PRICE) AS TOTAL_EARNING
    FROM CARTITEMS, BOOK
    WHERE (BOOK.ID IN (
        SELECT CARTITEMS.BOOK_ID 
        FROM CARTITEMS
        WHERE (CARTITEMS.CART_ID IN (
            SELECT CART_ID
            FROM ORDERS
            WHERE (TOUPPER(PAYMENT_STATUS) = 'PAID')
        )
        )
    ))
    GROUP BY TO_CHAR(ORDERS.DATE_DELIVERED, 'YYYY')
    ORDER BY YEAR`;
    const binds = {}
    return (await database.execute(query, binds, database.options)).rows;
}

async function getLastMonthEarnings() {
    const query = `SELECT TO_CHAR(ORDERS.DATE_DELIVERED, 'MON') AS MONTH, SUM(CARTITEMS.QUANTITY) AS TOTAL_SOLD, SUM(CARTITEMS.QUANTITY*BOOK.PRICE) AS TOTAL_EARNING
    FROM CARTITEMS, BOOK
    WHERE (BOOK.ID IN (
        SELECT CARTITEMS.BOOK_ID 
        FROM CARTITEMS
        WHERE (CARTITEMS.CART_ID IN (
            SELECT CART_ID
            FROM ORDERS
            WHERE (TOUPPER(PAYMENT_STATUS) = 'PAID')
        )
        )
    )) AND (TRUNC(SYSDATE, ORDERS.DATE_DELIVERED) <= 30)
    GROUP BY TO_CHAR(ORDERS.DATE_DELIVERED, 'MON')
    ORDER BY YEAR`;

    const binds = {}
    return (await database.execute(query, binds, database.options)).rows;
}

async function getLastYearEarnings() {
    const sql = `SELECT TO_CHAR(ORDERS.DATE_DELIVERED, 'MON') AS MONTH, SUM(CARTITEMS.QUANTITY) AS TOTAL_SOLD, SUM(CARTITEMS.QUANTITY*BOOK.PRICE) AS TOTAL_EARNING
    FROM CARTITEMS, BOOK
    WHERE (BOOK.ID IN (
        SELECT CARTITEMS.BOOK_ID 
        FROM CARTITEMS
        WHERE (CARTITEMS.CART_ID IN (
            SELECT CART_ID
            FROM ORDERS
            WHERE (TOUPPER(PAYMENT_STATUS) = 'PAID')
        )
        )
    )) AND (MONTHS_BETWEEN(SYSDATE, ORDERS.DATE_DELIVERED) <= 12)
    GROUP BY TO_CHAR(ORDERS.DATE_DELIVERED, 'MON')
    ORDER BY YEAR`;
}

module.exports = {
    getEarningByMonth,
    getLastMonthEarnings,
    getLastYearEarnings,
    getYearlyEarning
}