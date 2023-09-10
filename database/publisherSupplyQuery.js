const OracleDB = require('oracledb');
const database = require('./database');

async function addToSupply(p_name, b_id) {
    const query = `BEGIN
                    :OUTPUT := ADD_TO_SUPPLY(:name, :id);
                    END;`;
    const binds = {
        output: {
            dir: OracleDB.BIND_OUT,
            type: OracleDB.STRING
        },
        name: p_name,
        id: b_id      
    }
    const result = await database.execute(query, binds, database.options);
    console.log('Output: ', result.outBinds.output);
    return result.outBinds.output;
}

async function getAllSupplies(p_name) {
    const query = `SELECT si.supply_id, 
    to_char(s.date_supplied, 'yyyy-mm-dd') date_supplied, 
    s.payment_status,
    COUNT(si.quantity) AS total_quantity, 
    SUM(si.price * si.quantity) AS total_amount
    FROM supplyitems si
    JOIN publishersupply ps ON si.supply_id = ps.id
    LEFT JOIN supplies s ON si.SUPPLY_ID = s.SUPPLY_ID   
    WHERE ps.publisher = :name
    GROUP BY si.supply_id,s.date_supplied, s.payment_status`
    const binds = {
        name: p_name
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

async function updateSupplyData(s_id, b_id, price, quantity) {
    const query = `update supplyitems set quantity = :quantity, price = :price
                    where supply_id = :s_id and book_id = :b_id`;
    const binds = {
        s_id,
        b_id,
        quantity,
        price
    }
    try {
        await database.execute(query, binds, database.options);
    } catch(err) {
        console.log(err);
    }
}

async function sendSupply(s_id) {
    const query = `insert into supplies (supply_id, date_supplied) values (:s_id, sysdate)`;
    const binds = {
        s_id
    }
    try {
        await database.execute(query, binds, database.options);
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    addToSupply, 
    getAllSupplies,
    getSupplyAllData,
    updateSupplyData,
    sendSupply
}