var Beer = require('./model.js'); // Nome maiusculo porque é o nome do meu model e coloca o ./ pra dizer que tá na pasta.

var Controller = {
  create: function(req, res) {
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
  },

  retrieve: function(req, res) {
      var query = {};

      Beer.find(function (err, data) {
        if(err) {
          console.log(err);
          res.end('Erro:' + err); // o res.end() vai pra dentro da função assincrona porque se for fora, ele finaliza antes de responder.
        } else {
          console.log(data);
          res.end('Cervejas Listadas: ' + JSON.stringify(data));
        }
      });
  },

  update: function(req, res) {
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
          res.end('Erro:' + err); // o res.end() vai pra dentro da função assincrona porque se for fora, ele finaliza antes de responder.
        }else{
          console.log('Cerveja atualizada com sucesso', data);
          res.end('Cerveja atualizada com sucesso: ' + JSON.stringify(data));
        }
      });
  },

  delete: function(req, res) {
    var query = {name: /Brahma/i};

    Beer.remove(query, function (err, data) {
      if (err){
        console.log('Erro: ', err);
      res.end('Erro:' + err); // o res.end() vai pra dentro da função assincrona porque se for fora, ele finaliza antes de responder.
    }else{
      console.log('Cerveja deletada com sucesso', data);
      res.end('Cerveja deletada com sucesso: ' + JSON.stringify(data));
    }
  });
  }
}

// exportando o módulo
module.exports = Controller;