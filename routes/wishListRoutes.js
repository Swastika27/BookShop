const { Router } = require('express');

const Db_wishlist = require('../database/wishlistQuery');
const { route } = require('./cartRoutes');

const router = Router( { mergeParams: true } );

router.get('/', async (req, res) => {
    if(req.user == null) {
        console.log('user not logged in');
        res.redirect('/login');
    }
    else {
        const data = await Db_wishlist.getAllBooks(req.user.id);
        res.render('wishlist', {
            items: data
        })
    }
})

router.post('/:id', async (req, res)=> {
    if(req.user == null) {
        console.log('user not logged in');
        return res.send({
            user: null
        })
    }
    console.log('user logged in');
    try { 
        await Db_wishlist.addToWishlist(req.user.id, req.params.id);
        return res.sendStatus(200);
    }
    catch(err) {
        console.log(err);
    }
    return res.sendStatus(204);
})

router.get('/delete/:id', async (req, res) => {
    if(req.user == null) {
        res.redirect('/login');
    }
    try{    
        await Db_wishlist.deleteFromWishlist(req.user.id, req.params.id);
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;