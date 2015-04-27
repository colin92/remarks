app.controller('mainController', function($sce, $scope, getEntries, editEntry) {
  $scope.entry = 'hello world';
  $scope.loading = true;
  getEntries().then(function(data) {
      $scope.entries = data.map(function(email) {
      markedHtml = marked(email.messageHtml);
        email.messageHtml = $sce.trustAsHtml(markedHtml);
        return email;
      });
      $scope.loading = false;
    });
  $scope.editEntry = function(ev, entry) {
    editEntry(ev, entry);
  }
});
