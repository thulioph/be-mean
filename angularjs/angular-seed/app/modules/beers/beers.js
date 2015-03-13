(function() {
  'use strict';

  angular.module('myApp.beers', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/beers', {
      templateUrl: 'modules/beers/beers.html',
      controller: 'BeersCtrl'
    })
    .when('/beers/:id', {
      templateUrl: 'modules/beers/get.html',
      controller: 'BeersGetCtrl'
    });
  }])

  .controller('BeersCtrl', BeersCtrl)
  .controller('BeersGetCtrl', BeersGetCtrl);

  function BeersCtrl($scope, $http) {
    $scope.msg = 'Listagem das cervejas';
    $scope.reverse = false;
    $scope.predicate = 'name';

    $scope.ordenar = function(predicate) {
      $scope.predicate = predicate;
      $scope.reverse = !$scope.reverse
    }

    var url = 'http://localhost:3000/api/beers'
      , method = 'GET'
      ;

    $http({
      url: url
    , method: method
    })
    .success(function(data) {
      $scope.cervejas = data;
      console.log('Sucesso', data);
    })
    .error(function(data) {
      console.log('Erro: ', data);
    });

  }

  function BeersGetCtrl($scope, $http, $routeParams) {

    var id = $routeParams.id
      , url = 'http://localhost:3000/api/beers/'+id
      , method = 'GET'
      ;

    $http({
      url: url
    , method: method
    })
    .success(function(data) {
      $scope.cerveja = data;
      console.log('Sucesso', data);
    })
    .error(function(data) {
      console.log('Erro: ', data);
    });
  }

  BeersCtrl.$inject = ['$scope', '$http'];
  BeersGetCtrl.$inject = ['$scope', '$http', '$routeParams'];

})();