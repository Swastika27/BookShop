const database = require('./database');

async function confirmOrder(user_id, data) {
    const name = data.name;
    const address = data.address;
    const phone = data.phone;

    const query = `BEGIN 
                    :message := PLACEORDER(:ID, :NAME, :ADDRESS, :PHONE);
                    END;`;
    const binds = {
        id: user_id,
        name: name,
        address: address,
        phone: phone,

        message: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT
        }
    };

    try {
        const result = await database.execute(query, binds, database.options);
        // Access the return value from the output parameter
        const returnValue = result.outBinds.outputParam;

        console.log('Return Value:', returnValue);
        return returnValue;
    }
    catch (err) {
        console.log('error executing procedure ', err);
    }
}

module.exports = {
    confirmOrder
}