// Este rquivo foi criado após a finalização do exe06.js

// importando o módulo do HTTP, que faz toda comunicação http. Módulo web pra se trabalhar com node
var http = require('http');
var db = require('./config/db');
var Controller = require('./controller');

// criando o servidor passando uma função anônima porque a função não vai ser reutilizada
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  var url = req.url; // retorna o que vem na URL

  // Definindo as rotas e o que cada coisa faz..
  switch(url) {
    case '/beers':
      Controller.retrieve(req, res);
      break;

    case '/beers/create':
      Controller.create(req, res);
      break;

    case '/beers/update':
      Controller.update(req, res);
      break;

    case '/beers/delete':
      Controller.delete(req, res);
      break;

    default: res.end('Nenhuma rota foi informada.');
  } 

}).listen(3000);

console.log('Server running at http://localhost:3000');