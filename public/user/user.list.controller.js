(function () {
  'use strict';
  angular.module('BBMusicJam.User', []).controller('UserListController', [
    '$scope', '$http', '$templateCache', function($scope, $http, $templateCache) {
      $templateCache.put('userList/nameCell.html', '<div><a ui-sref="userdetail({username: rowData.username})">{{rowData.name}}</a></div>');

      var self = this;
      function populateGrid() {
        $http.get('/users').then(function(response) {
          self.gridOptions = {
            columns: [
              {
                caption: 'Name',
                id: 'name',
                name: 'name',
                json: 'name',
                width_all: 200,
                template_url: 'userList/nameCell.html'
              },
              {
                caption: 'Username',
                id: 'username',
                name: 'username',
                json: 'username',
                width_all: 200
              },
              {
                caption: 'Points',
                name: 'points',
                id: 'points',
                json: 'points'
              }
            ],
            data: response.data,
            selectedColumnIds: ['name', 'username', 'points'],
            hideFilters: true,
            hideColPicker: true
          };
        });
      }

      populateGrid();
    }
  ]);
})();


