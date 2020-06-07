function recordameMiddleware(req, res, next) {
    if (req.cookies.recordame != undefined && req.session.usuarioLogeado == undefined) {
        let usersFile = fs.readFileSync('users.json', { encoding: 'utf-8' }); //leer archivo
        let users;
        if (usersFile == "") {
            users = [];
        } else {
            users = JSON.parse(usersFile);//convierto el json en objeto
        }
        let usuarioALogearse;

        for (let i = 0; i < users.length; i++) {
            if (req.body.email == req.cookies.recordame) {
                usuarioALogearse = users[i];
                break;
            }
        }

        req.session.usuarioLogeado = usuarioALogearse;
    }
    next();
}

module.exports = recordameMiddleware;