let db = require('../database/models');
let sequelize = db.sequelize;

let moviesController = {
    list (req, res) {
        db.Movies.findAll()
        .then((movies) => {
            res.render('listadoDePeliculas ', {movies:movies})
        });
        /* PRIMER EJEMPLO */ 
       /*  sequelize.query('SELECT * FROM movies')
        .then(function (resultados) {
            let peliculas = resultados[0];
            res.render('listadoDePeliculas', {peliculas})
        });
         */
    },
    add (req, res) {

    },
    create (req, res) {

    },
    delete (req, res) {

    }
};

module.exports = moviesController;