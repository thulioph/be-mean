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

// Criando o modelo da minha cerveja a ser inserida.
var BeerSchema = new Schema({
  name: { type: String, default: '', required: true },
  description: { type: String, default: '' },
  alcohol: { type: Number, min: 0},
  price: { type: Number, min: 0},
  category: { type: String, default: ''},
  created: { type: Date, default: Date.now }
});

// Depois eu crio um model do beer.
var Beer = mongoose.model('Beer', BeerSchema);

// Crio os dados da minha cerveja
var dados = {
  name: 'Skol',
  description: 'Mijo de rato',
  alcohol: 4.5,
  price: 3.0,
  category: 'pilsen'
}

// instacio os dados no model Beer
var model = new Beer(dados);

// dar um save pra salvar a informação.
model.save(function (err, data) {
  if (err){
    console.log('Erro: ', err);
  }
  else{
    console.log('Cerveja Inserida: ', data);
  }
});

// Na criação do Schema, se coloca default vazio para ganhar performance, pois quando precisar inserir eu só altero o campo, não preciso mecher na estrutura do registro, só altero o valor, deixando as alterações muito mais rápidas.
