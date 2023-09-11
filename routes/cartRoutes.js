const { Router } = require('express');

const Db_cart = require('../database/cartQuery');
const Db_order = require('../database/orderQuery');

const router = Router( { mergeParams: true } );

router.post('/update', async (req, res) => {
    const items = JSON.parse(req.body.items);
    if(req.user == null) {
        res.writeHead(302, {'Location': '/login'})
    }
    for(let i = 0; i < items.length; i++) {
        await Db_cart.updateQuantity(items[i].ID, items[i].QUANTITY, req.user.id);
    }
    return res.sendStatus(200);
})

router.get('/', async (req, res) => {
    if(req.user == null) {
        console.log('cart: ' , 'user not logged in');
        res.redirect('/login');
    }
    else {
        const cartData = await Db_cart.getCartAllInfoFromId(req.user.id);
        // console.log(cartData);
        res.render('cart', {
            cartItems: cartData
        });
    }
})


router.post('/confirmOrder', async (req, res) => {
    if(req.user == null) {
        return res.redirect('/login');
    }
    await Db_order.confirmOrder(req.user.id, req.body);
    return res.redirect('/homepage');
})

router.post('/:id', async(req, res) => {
    console.log('add to cart called');
    if(req.user === null) {
        console.log('user not logged in');
        return res.send({
            user: null
        })
    }
// check if user has cart
    console.log('user logged in');
    const hasCart = await Db_cart.getActiveCart(req.user.id);
    if(hasCart.length === 0) {
        Db_cart.assignNewCart(req.user.id);
    }
    // const isAdded = await Db_cart.isAlreadyAdded(req.user.id, req.params.id);
    // console.log('isadded', isAdded);
    try {
        console.log('addin to cart');        
        await Db_cart.addToCart(req.user.id, req.params.id);
        return res.sendStatus(200);
    }
    catch(err) {
        console.log(err);
        return res.sendStatus(204);
    }
})

router.get('/delete/:id', async (req, res) => {
    if(req.user == null) {
        res.redirect('/login');
    }

    await Db_cart.deleteBookFromCart(req.params.id, req.user.id);
    return res.redirect('/cart');
})

router.get('/order', async (req, res) => {
    if(req.user === null) {
        return res.redirect('/login');
    }

    const customer_id = req.user.id;
    const cart_id = (await Db_cart.getActiveCart(customer_id))[0].ID;
    console.log(cart_id);

    res.render('order_form.ejs');
})


module.exports = router;