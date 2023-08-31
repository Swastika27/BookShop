const { Router } = require('express');

const Db_cart = require('../database/cartQuery');

const router = Router( { mergeParams: true } );

router.get('/', (req, res) => {
    res.render('cart');
})

router.post('/:id', async(req, res) => {
    console.log('add to cart called');
    if(req.user === null) {
        console.log('user not logged in');
        return res.send({
            user: null
        })
    }

    console.log('user logged in');
    const isAdded = await Db_cart.isAlreadyAdded(req.user.id, req.params.id);
    console.log('isadded', isAdded);
    if(isAdded == null) {
        console.log('addin to cart')

        console.log('user ', req.user.id);
        console.log('book ', req.params.id);
        
        await Db_cart.addToCart(req.user.id, req.params.id);
        return res.sendStatus(200);
    }
    else {
        return res.sendStatus(204);
    }
})

module.exports = router;