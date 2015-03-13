// Este rquivo foi criado após a finalização do exe06.js

// importando o módulo do HTTP, que faz toda comunicação http. Módulo web pra se trabalhar com node
var http = require('http');

// Abaixo é parte do arquivo exe03.js
// =======
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
// =======


// criando o servidor passando uma função anônima porque a função não vai ser reutilizada
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
    // Parte do arquivo exe03.js
    // =======
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
        res.end('Erro:' + err); // o res.end() vai pra dentro da função assincrona porque se for fora, ele finaliza antes de responder.
      }
      else{
        console.log('Cerveja Inserida: ', data);
        res.end('Cerveja Inserida: ' + JSON.stringify(data));
      }
    });
    // =======

}).listen(3000);

console.log('Server running at http://localhost:3000');