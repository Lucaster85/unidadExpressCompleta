let db = require('../database/models');
let sequelize = db.sequelize;

let moviesController = {
    list(req, res) {
        db.Movies.findAll()
            .then((movies) => {
                res.render('listadoDePeliculas', { movies: movies })
            });
        /* PRIMER EJEMPLO */
        /*  sequelize.query('SELECT * FROM movies')
         .then(function (resultados) {
             let peliculas = resultados[0];
             res.render('listadoDePeliculas', {peliculas})
         });
          */
    },
    add(req, res) {

    },
    create(req, res) {

    },
    delete(req, res) {

    },
    detail(req, res) {
        db.Movies.findByPk(req.params.id)
            .then(movie => {
                res.render('detallePelicula', { movie })
            })
    },
    drama(req, res) {
        db.Movies.findAll({
            where: {
                genre_id: 3
            }
        })
            .then(movies => {
                res.render('peliculasDrama', { movies })
            })
    },
    top(req, res) {
        db.Movies.findAll({
            where: {
                rating: { [db.Sequelize.Op.gt] : 8}
            },
            order: [
                ['title', 'ASC']
            ],
            limit: 5,
            offset: 3
        })
            .then(movies => {
                res.render('top', { movies })
            })

    }
};

module.exports = moviesController;