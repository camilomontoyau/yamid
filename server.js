const restify = require('restify');
const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es un campo requerido.']
  },
  apellidos: {
    type: String,
    required: false
  },
  estado: {
    type: Boolean,
    required: [true, 'El estado es un campo requerido.'],
    default: true
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

const server = restify.createServer({
  name: 'aprendiendo-restify'
});

server
  .use(restify.plugins.bodyParser())
  .use(restify.plugins.queryParser({ mapParams: false }));

// Conexion DB
mongoose.connect(
  'mongodb://localhost/yamid',
  (err, res) => {
    if (err) {
      console.log('+++++++++++++++++++++++++++++++++++++++++');
      console.log('Base de datos: OFFLINE');
      console.log('+++++++++++++++++++++++++++++++++++++++++');
      console.log('err', err);
      throw err;
    }
    console.log('********************************************');
    console.log('Base de datos: ONLINE');
    console.log('********************************************');
  }
);

server.get('/', (req, res) => {
  return res.send({ ok: true, data: 'Bienvenido!!!!' });
});

// Configuracion del Servidor
server.listen(4000, 'localhost', () => {
  console.log('********************************************');
  console.log('Servidor encendido: ', server.url);
  console.log('Escuchando puerto: ', process.env.PORT);
  console.log('********************************************');
});

console.log('terminé de leer el archivo server.js');
