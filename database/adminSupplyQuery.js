const OracleDB = require('oracledb');
const database = require('./database');

async function getAllSupplies() {
    const query = `SELECT si.supply_id, ps.publisher,
    to_char(s.date_supplied, 'yyyy-mm-dd') date_supplied, 
    s.payment_status,
    sum(si.quantity) AS total_quantity, 
    SUM(si.price * si.quantity) AS total_amount
    FROM supplyitems si
    JOIN publishersupply ps ON si.supply_id = ps.id
    LEFT JOIN supplies s ON si.SUPPLY_ID = s.SUPPLY_ID   
    GROUP BY si.supply_id,s.date_supplied, s.payment_status, ps.publisher`
    const binds = {
    }
    return (await database.execute(query, binds, database.options)).rows;
}

async function getSupplyAllData(id) {
    const query = `SELECT B.ID AS ID, TITLE, SI.PRICE, si.supply_id, 
    s.date_supplied, 
    s.payment_status,
    sum(si.quantity) AS quantity, 
    SUM(si.price * si.quantity) AS amount
    FROM supplyitems si
    JOIN publishersupply ps ON si.supply_id = ps.id
    JOIN BOOK B ON SI.BOOK_ID = B.ID
    LEFT JOIN supplies s ON si.SUPPLY_ID = s.SUPPLY_ID   
    WHERE si.supply_id = :id
    GROUP BY si.supply_id, SI.PRICE,s.date_supplied, s.payment_status, B.ID, B.TITLE, B.PRICE`
    const binds = {
        id
    }
    return (await database.execute(query, binds, database.options)).rows;
}

async function updatePaymentStatus(s_id, status) {
    console.log(s_id, status);
    const query = `update supplies 
                    set payment_status= :status
                    where supply_id = :s_id`;
    const binds = {
        s_id,
        status
    }
    try {
        await database.execute(query, binds, database.options);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getAllSupplies,
    getSupplyAllData,
    updatePaymentStatus
}