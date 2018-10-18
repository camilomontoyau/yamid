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

var connectWithRetry = function() {
  return mongoose.connect(
    'mongodb://mongocontainer/yamid',
    (err, res) => {
      if (err) {
        console.log('+++++++++++++++++++++++++++++++++++++++++');
        console.log('Base de datos: OFFLINE');
        console.log('+++++++++++++++++++++++++++++++++++++++++');
        console.log('err', err);
        setTimeout(() => {
          console.log('+++++++++++++++++++++++++++++++++++++++++');
          console.log('reintentando conexion con DB');
          console.log('+++++++++++++++++++++++++++++++++++++++++');
          connectWithRetry();
        }, 5000);
      }
      console.log('********************************************');
      console.log('Base de datos: ONLINE');
      console.log('********************************************');
    }
  );
};
connectWithRetry();

server.get('/', (req, res) => {
  console.log('********************************************');
  console.log('request al endpoint /');
  console.log('********************************************');
  return res.send({ ok: true, data: 'Bienvenido!!!!' });
});

const port = 4000;
// Configuracion del Servidor
server.listen(port, () => {
  console.log('********************************************');
  console.log('Servidor encendido: ', server.url);
  console.log('Escuchando puerto: ', port);
  console.log('********************************************');
});

console.log('terminé de leer el archivo server.js');
