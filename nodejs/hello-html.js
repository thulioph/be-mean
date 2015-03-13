// importando o módulo do HTTP, que faz toda comunicação http. Módulo web pra se trabalhar com node
var http = require('http');
var fs = require('fs'); // file-system
var index = fs.readFileSync('index.html'); // passa o arquivo.

// criando o servidor passando uma função anônima porque a função não vai ser reutilizada
http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/html; charset=uft-8'}); // passando o content do cabeçalho com o código 200 do HTTP
  response.end(index); // se não passar o end ele fica com a conexão aberta.
}).listen(3000);

console.log('Server running at http://localhost:3000');