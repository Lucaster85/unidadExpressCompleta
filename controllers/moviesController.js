let db = require('../database/models');
let sequelize = db.sequelize;
let op = require('sequelize').Op;

let moviesController = {
    list(req, res) {
        db.Movies.findAll()
            .then((movies) => {
                res.render('listadoDePeliculas', { movies, title: 'Listado de Peliculas' })
            });
    },
    add(req, res) {
        res.render('crearPelicula')
    },
    create(req, res) {
        db.Movies.create({
            title: req.body.title,
            rating: req.body.rating,
            length: req.body.length,
            release_date: req.body.release_date,
            awards: req.body.awards
        });
        res.redirect('/movies');
    },
    edit(req, res) {
        db.Movies.findByPk(req.params.id)
            .then(movie => {
                res.render('editarPelicula', { movie })
            })
    },
    update(req, res) {
        db.Movies.update({
            title: req.body.title,
            rating: req.body.rating,
            length: req.body.length,
            release_date: req.body.release_date,
            awards: req.body.awards
        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect(`/movies/edit/${req.params.id}`)
    },
    delete(req, res) {
        db.Movies.destroy({
            where:{
                id: req.params.id
            }
        })
        res.redirect('/movies')
    },
    detail(req, res) {
        db.Movies.findByPk(req.params.id)
            .then(movie => {
                res.render('listadoDePeliculas', { movie, title: 'Detalle de la pelicula' })
            })
    },
    drama(req, res) { //SOLO ES UN EJEMPLO, LA RUTA NO TIENE SENTIDO
        db.Movies.findAll({
            where: {
                genre_id: 3
            }
        })
            .then(movies => {
                res.render('listadoDePeliculas', { movies, title: 'Peliculas de drama' })
            })
    },
    top(req, res) {
        db.Movies.findAll({
            where: {
                rating: { [db.Sequelize.Op.gt]: 8 }
            },
            order: [
                ['title', 'ASC']
            ],
            limit: 5,
            offset: 3
        })
            .then(movies => {
                res.render('listadoDePeliculas', { movies, title: 'Peliculas TOP' })
            })

    },
    totalTime(req, res) {
        db.Movies.sum('length')
            .then(resultado => {
                res.send(`El tiempo total de duracion de todas las peliculas es de ${resultado} minutos`);
            })
    },
    search(req, res) {
        db.Movies.findAll({
            where: {
                title: {
                [op.substring] : req.query.q
            }}
        }) .then(movies => {
            res.render('listadoDePeliculas', { movies, title: 'Resultado de la busqueda'})
        })
    }
};

module.exports = moviesController;