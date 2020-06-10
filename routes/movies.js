var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

router.get('/', moviesController.list);

router.get('/drama', moviesController.drama);

router.get('/top', moviesController.top);

router.get('/totalTime', moviesController.totalTime);

router.get('/add', moviesController.add);

router.post('/add', moviesController.create);

router.get('/edit/:id', moviesController.edit);

router.post('/edit/:id', moviesController.update);

router.get('/search', moviesController.search)

router.get('/:id', moviesController.detail);

module.exports = router;