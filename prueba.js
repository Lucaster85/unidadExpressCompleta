var fs = require('fs');

//fs.writeFileSync('prueba.txt', 'Hola mundo!!')
//fs.appendFileSync('prueba.txt', 'Hola mundo!!')

let contenido = fs.readFileSync('prueba.txt', {encoding:'utf-8'});

console.log(contenido);

let bcrypt = require('bcrypt');

let password = 'lucaster85';

let resultado = bcrypt.hashSync(password, 10);

console.log(resultado);

