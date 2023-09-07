const {Router} = require('express');
const DB_admin = require('../../database/adminEarning');

const router = Router({mergeParams: true});

router.get('/', async (req, res) => {
    if(req.admin == null) {
        return res.redirect('/admin/login');
    }
    // const monthlyEarning = await DB_admin.getEarningByMonth();
    // const yearlyEarning = await DB_admin.getYearlyEarning;
    // const lastMonthEarning = await DB_admin.getLastMonthEarnings();
    // const lastYearEarning = await DB_admin.getLastYearEarnings();

    res.render('adminHome.ejs', {
        title: 'Home',
        // monthlyEarning,
        // yearlyEarning,
        // lastMonthEarning,
        // lastYearEarning
    })
})

module.exports = router;