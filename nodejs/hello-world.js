// importando o módulo do HTTP, que faz toda comunicação http. Módulo web pra se trabalhar com node
var http = require('http');

// criando o servidor passando uma função anônima porque a função não vai ser reutilizada
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World');
  res.end();
}).listen(3000);

console.log('Server running at http://localhost:3000');
