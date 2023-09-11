const { Router } = require('express');

const Db_rating = require('../database/ratingQuery');

const router = Router({mergeParams: true});

router.post('/:id', async (req, res) => {
    if(req.user == null) {
        console.log('user not logged in');
        return res.send({
            user: null
        })
    }
    console.log(req.body);
    try {
        await Db_rating.addRating(req.user.id, req.params.id, req.body.ratings);
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(204);
    }
})

module.exports = router;