const { Router } = require('express');//exportaciones 
const { getData, createData, deleteContent, updatedData, getContentId } = require('../data/dataLogic');

const router = Router();
const infoNav = 'Taller Electiva II';

router.get('/', function (req, res) {
    const data = getData();
    res.render('index', {
        infoNav,
        data
    })
});

router.get('/new', function (req, res) {
    res.render('addPhone', { infoNav });
})
//about
router.get('/about', function (req, res){
    res.render('about',{ infoNav});
})

router.post('/', function (req, res) {
    createData(req.body);
    res.redirect('/');
});

router.get('/delete/:element', function (req, res) {
    const { element } = req.params;
    deleteContent({id:element});
    res.redirect('/');
});

router.get('/edit/:element', function (req, res) {
    const { element } = req.params;
    const { uid, lastName, firstName, number } = getContentId({ id: element });
    res.render('edit', {
        infoNav,
        uid,
        lastName,
        firstName,
        number
    });

});

router.post('/updated/:element', function (req, res) {
    const { element } = req.params;
    updatedData({ id: element }, req.body);
    res.redirect('/');
})


module.exports = router;