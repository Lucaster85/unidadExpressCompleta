var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multer = require('multer'); //requerir multer para subir archivos
var userController = require(path.join('..', 'controllers', 'userController'));
var logDBMiddleware = require('../middleware/logDBMiddleware');
var { check, validationResult, body } = require('express-validator');

//multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/my-uploads') //crear las carpetas o modificar la ruta
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  } // AGREGAR path.extname(file.originalname) para tener la extencion del archivo
})

var upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', userController.register);
router.post('/register', upload.any(), logDBMiddleware, [
  check('email').isEmail().withMessage('Debe ser un email valido'),
  check('name').isLength({ min: 1 }).withMessage('Debes escribir un nombre para el usuario'),
  check('age').isInt({ min: 0 }).withMessage('La edad debe ser numerica y mayor que 0'),
  check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener como minimo 8 caracteres'),
  body('email').custom((value) => {
    let usersJson = fs.readFileSync('users.json', { encoding: 'utf-8' });
    let users;
    if (usersJson == "") {
      users = [];
    } else {
      users = JSON.parse(usersJson);
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == value) {
        return false
      } else { return true }
    }
  }).withMessage('El usuario ya existe')
], userController.create);

router.get('/login', userController.login);
router.post('/login', [
  check('email').isEmail().withMessage('Debe ser un email valido'),
  check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener como minimo 8 caracteres'),
], userController.processLogin);

router.get('/list', userController.list);

router.get('/search', userController.search);

router.get('/edit/:idUser', userController.edit);
router.put('/edit', (req, res) => {
  res.send('Fui por PUT')
})

router.delete('/delete/:idUser', (req, res) => {
  res.send('SOY DELETE!!!')
})

module.exports = router;
