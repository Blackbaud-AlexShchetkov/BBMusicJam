(function () {
  'use strict';
  angular.module('BBMusicJam.User').controller('UserDetailController', [
    '$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
      var self = this;
      self.user = {};
      self.teamTile = { title: 'Teams', collapsed: false };
      self.playlistTile = { title: 'Current Playlists', collapsed: false };

      function loadUser() {
        $http.get('/userInfo', { params: { username: $stateParams.username }}).then(function(response) {
          self.user = response.data ? response.data : {};
        });
      }

      function loadTeams() {
        $http.get('/teams', { params: { username: $stateParams.username } }).then(function(response) {
          self.teamTile.gridOptions = {
            columns: [
              {
                caption: 'Team',
                id: 'teamname',
                name: 'teamname',
                json: 'teamname'
              }
            ],
            data: response.data,
            selectedColumnIds: ['teamname'],
            hideFilters: true,
            hideColPicker: true
          };
        });
      }

      function loadPlaylists() {
        $http.get('/playlists', { params: { username: $stateParams.username } }).then(function(response) {
          self.playlistTile.gridOptions = {
            columns: [
              {
                caption: 'Team',
                id: 'teamname',
                name: 'teamname',
                json: 'teamname'
              },
              {
                caption: 'Date',
                id: 'date',
                name: 'date',
                json: 'date'
              }
            ],
            data: response.data,
            selectedColumnIds: ['teamname', 'date'],
            hideFilters: true,
            hideColPicker: true
          };
        });
      }

      loadUser();
      loadTeams();
      loadPlaylists();
    }
  ]);
})();


