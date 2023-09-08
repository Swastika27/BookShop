const {Router} = require('express');
const router = Router({mergeParams: true});

const DB_publisher = require('../../database/adminPublisherQuery');

router.get('/', async (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    const publisher_data = await DB_publisher.getAllPublisherInfo();
    // console.log(publisher_data);

    res.render('adminPublisher.ejs', {
        items: publisher_data
    });
})

router.get('/edit/:id', async (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    console.log(req.params.id);
    const publisher = await DB_publisher.getPublisherAllInfo(req.params.id);
    // console.log(publisher);
    console.log({
        title: 'Edit publisher',
        name: publisher[0].NAME,
        address: publisher[0].ADDRESS,
        email: publisher[0].EMAIL
    })
    res.render('adminEditPublisher', {
        title: 'Edit publisher',
        name: publisher[0].NAME,
        address: publisher[0].ADDRESS,
        email: publisher[0].EMAIL
    });
})

router.post('/edit/:id', async (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    await DB_publisher.updatePublisher(req.body.name, req.body.address, req.body.email);

    res.redirect('/admin/publisher');
})

router.get('/delete/:id', async (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    await DB_publisher.deletePublisher(req.params.id);
    res.redirect('/admin/publisher');    
})

router.get('/add', async (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    res.render('adminAddPublisher.ejs', {
        title: 'Add publisher',
        name: '',
        email: '',
        address: ''
    })
})

router.post('/add', async (req, res) => {
    if(req.admin == null) {
        res.redirect('/admin/login');
    }
    await DB_publisher.addNewPublisher(req.body.name, req.body.address, req.body.email);
    res.redirect('/admin/publisher');
})

module.exports = router;
