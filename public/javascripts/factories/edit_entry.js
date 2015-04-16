app.factory('editEntry', function editEntryFactory($mdDialog) {
  return function(ev, entry) {
    $mdDialog.show({
      controller: function($scope, $mdDialog) {
        $scope.hide = function() { $mdDialog.hide() };
        $scope.show = function() { $mdDialog.show() };
        $scope.cancel = function() { $mdDialog.cancel() };
        $scope.entry = entry;
        console.log($scope);
      },
      templateUrl: '/partials/_edit_entry.html',
      targetEvent: ev
    })
    .then(function() {
      console.log(entry_id, 'is answer: 42');    
    });
  }; 
})
