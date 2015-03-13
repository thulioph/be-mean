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

var query = {name: /skol/i};

var mod = {
  name: 'Brahma',
  alcohol: 4,
  price: 6,
  category: 'pilsen'
};

var optional = {
  upsert: false,
  multi: false
};

Beer.update(query, mod, function (err, data) {
   if (err){
     console.log('Erro: ', err);
   }else{
     console.log('Cerveja atualizada com sucesso', data);
   }

   process.exit(0);
});

// Ele vai buscar pela cerveja da minha query, e alterar pela do mod (Brahma);
// Executando novamente o exe04.js vai listar o update da cerveja SKOL pra BRAHMA.


