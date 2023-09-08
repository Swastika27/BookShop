const {Router} = require('express');

const router = Router({mergeParams: true});

const DB_order = require('../../database/adminOrderQuery');

router.get('/', async (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    const order_data = await DB_order.getAllOrders();
    console.log(order_data);
    res.render('adminOrder.ejs', {
        title: 'Admin-orders',
        items: order_data
    });
})

router.post('/update', async (req, res) => {
    let items = req.body.items;
    items = JSON.parse(items);
    for(let i = 0; i < items.length; i++) {
        if(items[i].DELIVERY_DATE !== undefined) {
            await DB_order.updateDeliveryDate(items[i].CART_ID, items[i].DELIVERY_DATE);

        }
        await DB_order.updatePaymentStatus(items[i].CART_ID, items[i].PAYMENT_STATUS);
    }
    return res.sendStatus(200);
})

module.exports = router;