var app = angular.module('myApp', []);

app.controller('mainController', function($sce, $scope, getEntries) {
  $scope.entry = 'hello world';
  getEntries().then(function(data) {
      $scope.entries = data.map(function(email) {
        email.message = $sce.trustAsHtml(email.message);
        return email;
      });
    });
})
.factory('getEntries', function getEntriesFactory($http) {
  return function() { 
    return $http.get('/entries').then(function(response) {
      return response.data;
    });
 };
})
.directive('entry', function() {
  return {
    restrict: 'E',
    templateUrl: '/partials/_entry.html'
  }
});
