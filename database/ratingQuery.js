const database = require ('./database');

async function addRating(c_id, b_id, r) {
    const query = `BEGIN 
                    GIVE_RATING(:C_ID, :B_ID, :R);
                    END;`;
    const binds = {
        c_id,
        b_id, 
        r
    }
    try {
        await database.execute(query, binds, database.options)
    } catch(err) {
        console.log(err);
    }
}
module.exports = {
    addRating
}