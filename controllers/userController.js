var fs = require('fs');
var bcrypt = require('bcrypt');
var { check, validationResult, body } = require('express-validator');

module.exports = {
    'register': (req, res) => { //usando arrow function
        res.render('register');

    },
    login(req, res) { //una forma mas simplificada de codear el metodo
        res.render('login');
    },
    list(req, res) {
        let usersFile = fs.readFileSync('users.json', { encoding: 'utf-8' });

        let users = JSON.parse(usersFile);

        res.render('userList', { 'users': users });
    },
    processLogin(req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let usersFile = fs.readFileSync('users.json', { encoding: 'utf-8' }); //leer archivo
            let users;
            if (usersFile == "") {
                users = [];
            } else {
                users = JSON.parse(usersFile);//convierto el json en objeto
            }
            let usuarioALogearse;

            for (let i = 0; i < users.length; i++) {
                if (req.body.email == users[i].email && bcrypt.compareSync(req.body.password, users[i].password)) {
                    usuarioALogearse = users[i]
                    break;
                }
            }
            if (usuarioALogearse == undefined) {
                return res.render('login', {
                    errors: [
                        { msg: 'Credenciales invalidas' }
                    ]
                })
            }
            req.session.usuarioLogeado = usuarioALogearse;

            if (req.body.recordame != undefined) {
                res.cookie('recordame', usuarioALogearse.email, { maxAge: 60000 })
            }

            res.send('Exitoso')
        } else {
            return res.render('login', { errors: errors.errors })
        }

    },
    search(req, res) {
        let loQueBuscoElUsuario = req.query.search;

        let usersFile = fs.readFileSync('users.json', { encoding: 'utf-8' });

        let users = JSON.parse(usersFile);

        let usersResults = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].name.includes(loQueBuscoElUsuario)) {
                usersResults.push(users[i]);
            }
        }
        res.render('usersResults', { usersResults })
    },
    'create': function (req, res, next) { //agregar el next cuando subo una imagen //ya que estoy subiendo una imagen con upload.any()
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            let user = {
                name: req.body.name,
                age: req.body.age,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.files[0].filename //del objeto req la propiedad files, [0] el primer archivo que se sube, tomar la propiedad filename.
            }
            let usersFile = fs.readFileSync('users.json', { encoding: 'utf-8' }); //leer archivo
            let users;
            if (usersFile == "") {
                users = [];
            } else {
                users = JSON.parse(usersFile);//convierto el json en objeto
            }
            users.push(user);

            let usersJson = JSON.stringify(users);

            fs.writeFileSync('users.json', usersJson);

            //let usuariosJson = JSON.stringify(user);
            //fs.writeFileSync('user.json', usuariosJson)

            res.redirect('/users/list')
        } else { res.render('register', { errors: errors.errors }) }
    },
    edit(req, res) {
        let userId = req.params.idUser;
        let users = [
            { id: 1, name: 'Ramón' },
            { id: 2, name: 'Magda' },
            { id: 3, name: 'Lucas' },
            { id: 4, name: 'Juan' },
            { id: 5, name: 'Belu' }
        ];
        let userToEdit = users[userId];
        res.render('userEdit', { userToEdit })
    }
}