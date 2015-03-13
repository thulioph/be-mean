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


// Cria um model chamato Cat
var Cat = mongoose.model('Cat', { name: String }, 'gatinhos'); 
// O schema do Cat é name
// meu model é chamado Cat
// E vai criar uma coleção pluralizada chamada Cats
// posso criar um nome diferente pra minha coleção, passando um terceiro parâmetro, no caso 'gatinhos', caso não queria não coloco nada.

var kitty = new Cat({ name: 'Osvaldinho' });

kitty.save(function (err, data) {
  if (err){
   console.log('Erro: ', err);
  }

  console.log('meow', data);
});

// Se eu rodar um `mongo` depois um `use bemean` (vou está dentro da minha database) e depois rodar um `show collections` estará listado o CATS.