var mongoose = require('mongoose');
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

module.exports = mongoose.model('Beer', BeerSchema);

// Tudo dentro desse arquivo é private, só fica publico por conta do module.exports;