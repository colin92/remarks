app.factory('getEntries', function getEntriesFactory($http) {
  return function() { 
    return $http.get('/entries').then(function(response) {
      return response.data;
    });
 };
})
