var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bemean');

var db = mongoose.connection;

// gerenciando as conexões
db.on('error', function(err){
    console.log('Erro de conexao.', err);
});
db.on('open', function () {
  console.log('Conexão aberta.');
});
db.on('connected', function(err){
    console.log('Conectado.');
});
db.on('disconnected', function(err){
    console.log('Desconectado;');
});

var Schema = mongoose.Schema;

var BeerSchema = new Schema({
  name: { type: String, default: '', required: true },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  price: { type: Number, min: 0},
  category: { type: String, default: ''},
  created: { type: Date, default: Date.now }
});

var Beer = mongoose.model('Beer', BeerSchema)
  , query = {};

Beer.find(function (err, data) {
    if(err) {
       console.log(err);
    } else {
       console.log(data)
    }

    // para finalizar o processo no Node.js
    process.exit(0);
});

