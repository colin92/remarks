app.controller('mainController', function($sce, $scope, getEntries, editEntry) {
  $scope.entry = 'hello world';
  $scope.loading = true;
  getEntries().then(function(data) {
      $scope.entries = data.map(function(email) {
        email.messageHtml = $sce.trustAsHtml(email.messageHtml);
        return email;
      });
      $scope.loading = false;
    });
  $scope.editEntry = function(ev, entry) {
    editEntry(ev, entry);
  }
});
