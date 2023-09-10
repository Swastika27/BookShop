const {Router} = require('express');
const router = Router({mergeParams: true});

const DB_supply = require('../../database/adminSupplyQuery');

router.get('/', async (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    const result = await DB_supply.getAllSupplies();
    console.log(result);
    res.render('adminSupply.ejs', {
        items: result
    });
})

router.post('/update', async (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    console.log('inside update');
    items = JSON.parse(req.body.items);
    
    console.log(items.length);

    for(let i = 0; i < items.length; i++) {
        console.log('data pay na');
        console.log(items[i].SUPPLY_ID, items[i].PAYMENT_STATUS);
        await DB_supply.updatePaymentStatus(items[i].SUPPLY_ID, items[i].PAYMENT_STATUS)
    }
    console.log('hei');
})

module.exports = router;