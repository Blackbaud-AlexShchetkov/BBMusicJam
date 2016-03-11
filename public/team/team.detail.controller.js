(function () {
  'use strict';
  angular.module('BBMusicJam.Team').controller('TeamDetailController', [
    '$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
      var locals = $scope.locals = {},
      self = this;

      // console.log("Detail!");
      // console.log($stateParams.teamname);

      self.team = {
        teamname: '',
        members: []
      };
      self.memberNames = [];
      self.teamname = '';
      self.memberTotal = 0;
      self.membersTile = {title: 'Members', collapsed: false};

      function loadTeam() {
        $http.get('/teams').then(function (result) {
          // status code between 200 and 299 considered success
          if (result.status >= 200 && result.status <= 299) {
            // self.team = result.data.find({teamname: $stateParams.teamname});
            angular.forEach(result.data, function (team) {
              if (team.teamname === $stateParams.teamname) {
                self.team = team;
              }
            });

          }

          loadUser();

          self.membersTile.gridOptions = {
            columns: [
              {
                caption: 'Name',
                id: 'name',
                name: 'name',
                json: 'name',
                width_all: 500
              },
              {
                caption: 'Username',
                id: 'username',
                name: 'username',
                json: 'username'
              }
            ],
            data: self.memberNames,
            selectedColumnIds: ['name', 'username'],
            hideFilters: true,
            hideColPicker: true
          };
          self.memberTotal = self.team.members.length;

        });
      }

      function loadUser() {
        angular.forEach(self.team.members, function (username) {
          $http.get('/userInfo', { params: { username: username }}).then(function(response) {
            self.memberNames.push(response.data);
            console.log(self.memberNames);
          });
        });
      }

      loadTeam();

    }
  ]);
})();
