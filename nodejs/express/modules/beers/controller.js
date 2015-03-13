var Beer = require('./model.js'); // Nome maiusculo porque é o nome do meu model e coloca o ./ pra dizer que tá na pasta.

var Controller = {
  create: function(req, res) {
      var dados = req.body;

      // instacio os dados no model Beer
      var model = new Beer(dados);

      // dar um save pra salvar a informação.
      model.save(function (err, data) {
        if (err){
          console.log('Erro: ', err);
          res.json('Erro:' + err); // o res.json() vai pra dentro da função assincrona porque se for fora, ele finaliza antes de responder.
        }
        else{
          console.log('Cerveja Inserida: ', data);
          res.json(data);
        }
      });
  },

  retrieve: function(req, res) {
      var query = {};

      Beer.find(function (err, data) {
        if(err) {
          console.log(err);
          res.json('Erro:' + err); // o res.json() vai pra dentro da função assincrona porque se for fora, ele finaliza antes de responder.
        } else {
          console.log(data);
          res.json(data);
        }
      });
  },

  get: function(req, res) {
      var query = {_id: req.params.id}; // array das variaveis de url que você coloca

      Beer.findOne(function (err, data) {
        if(err) {
          console.log(err);
          res.json('Erro:' + err); // o res.json() vai pra dentro da função assincrona porque se for fora, ele finaliza antes de responder.
        } else {
          console.log(data);
          res.json(data);
        }
      });
  },

  update: function(req, res) {
      var query = {_id: req.params.id};
      var mod = req.body; // é criado pelo bodyparse ele recebe os dados que vem e transfere pra json

      Beer.update(query, mod, function (err, data) {
        if (err){
          console.log('Erro: ', err);
          res.json('Erro:' + err); // o res.json() vai pra dentro da função assincrona porque se for fora, ele finaliza antes de responder.
        }else{
          console.log('Cerveja atualizada com sucesso', data);
          res.json(data);
        }
      });
  },

  delete: function(req, res) {
    var query = {_id: req.params.id};

    Beer.remove(query, function (err, data) {
      if (err){
          console.log('Erro: ', err);
        res.json('Erro:' + err); // o res.json() vai pra dentro da função assincrona porque se for fora, ele finaliza antes de responder.
      }else{
        console.log('Cerveja deletada com sucesso', data);
        res.json(data);
      }
  });
  },

  renderList: function(req, res) {
    var query = {};

    Beer.find(function (err, data) {
      if(err) {
        console.log(err);
        res.render('beers/error', { error: err });
      } else {
        console.log('Cervejas Listadas: ', data);
        res.render('beers/index', { title: 'Listagem das cervejas', beers: data });
      }
    });
  },

  renderGet: function(req, res) {
    var query = {_id: req.params.id}; // array das variaveis de url que você coloca

    Beer.findOne(function (err, data) {
      if(err) {
        console.log(err);
        res.render('beers/error', { error: err });
      } else {
        console.log('Cervejas Consultada: ', data);
        res.render('beers/get', { title: 'Ceveja' + data.name, beer: data });
      }
    });
  },

  renderCreate: function(req, res) {
    res.render('beers/create', {title: 'Cadastro de Cerveja'});
  },

  renderUpdate: function(req, res) {
    var query = {_id: req.params.id}; // array das variaveis de url que você coloca

    Beer.findOne(function (err, data) {
      if(err) {
        console.log(err);
        res.render('beers/error', { error: err });
      } else {
        console.log('Cervejas consultada: ', data);
        res.render('beers/update', { title: 'Ceveja ' + data.name, beer: data });
      }
    });
  },

  renderRemove: function(req, res) {
    var query = {_id: req.params.id}; // array das variaveis de url que você coloca

    Beer.findOne(function (err, data) {
      if(err) {
        console.log(err);
        res.render('beers/error', { error: err });
      } else {
        console.log('Cervejas consultada: ', data);
        res.render('beers/remove', { title: 'Remover Cerveja ' + data.name, beer: data });
      }
    });
  }
};

// exportando o módulo
module.exports = Controller;