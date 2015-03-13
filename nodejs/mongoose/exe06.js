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

var Beer = mongoose.model('Beer', BeerSchema);

var query = {name: /Brahma/i};

Beer.remove(query, function (err, data) {
   if (err){
     console.log('Erro: ', err);
   }else{
     console.log('Cerveja deletada com sucesso', data);
   }

   process.exit(0);
});

// O remove é MULTI, então caso tenha várias cerveja com a mesma querie (BRAHMA), irá deletar todas.
// Se rodar novamente o exe04.js não terá nenhuma cerveja.