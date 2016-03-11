function RunTemplateCache($templateCache) {
  $templateCache.put('team/addTeam.html', '<bb-modal><div class="modal-form"><bb-modal-header>Add Team</bb-modal-header><div bb-modal-body><form><div class="form-group"><label class="control-label">Team Name</label><input ng-model="locals.inputTeamName" type="text" class="form-control" /></div></form></div><bb-modal-footer><bb-modal-footer-button-primary data-ng-click="saveTeam()"></bb-modal-footer-button-primary><bb-modal-footer-button-cancel></bb-modal-footer-button-cancel></bb-modal-footer></div></bb-modal>');
}

(function () {
  'use strict';
  angular.module('BBMusicJam.Team', []).run(RunTemplateCache).controller('TeamController', [
    "$scope", "$filter", "$timeout", "$http", "bbModal", "$cookies", function ($scope, $filter, $timeout, $http, bbModal, $cookies) {
      var locals = $scope.locals = {
        gridOptions: {},
        teamSet: [],
        clickedSave: false,
        inputTeamName: ''
      };

      $http.get('/teams').then(function (result) {
        // status code between 200 and 299 considered success
        if (result.status >= 200 && result.status <= 299) {
          locals.teamSet = result.data;
        }
        // locals.teams = result.data;
        // angular.forEach(locals.teams, function (team) {
        //   if (team.members.indexOf("tmorton") > -1 ) {
        //     // locals.historySet.push(team);
        //   }
        // });
        // console.log("Teams", locals.historySet);
      });

      $timeout(function () {
        locals.gridOptions = {
          columns: [
            {
              caption: 'Team',
              jsonmap: 'teamname',
              id: 'team',
              name: 'teamname'
            }
          ],
          data: locals.teamSet,
          multiselect: false,
          hideFilters: false,
          sortOptions: { excludedColumns: [] }, // no columns are excluded from sorting
          selectedColumnIds: ['team'],
          onAddClick: function () {
            if (locals.clickedSave === false) {
            bbModal.open({
              controller: 'TeamController',
              templateUrl:'team/addTeam.html'
            });
          }

            if (locals.clickedSave) {
              if (!locals.inputTeamName || locals.inputTeamName === '') {
                locals.clickedSave = false;
                // dismiss modal
                return;
              }

              $http.post('/createTeam', {"teamname": locals.inputTeamName}).then(function (result) {
                if (result.status >= 200 && result.status <= 299) {
                  $http.post('/addMember', {"teamname": locals.inputTeamName, "username": $cookies.get("user")}).then(function (result) {
                    $modalInstance.close();
                    window.location.reload(true);
                  }, function (error){
                    console.log("Error");
                  });
                }
              });
              // bbModal.close();
              locals.clickedSave = false;
            }
          },
          onAddClickLabel: 'Add team',
          hasMoreRows: false
        };

        $scope.saveTeam = function () {
          console.log(locals.inputTeamName)
          locals.clickedSave = true;
          locals.gridOptions.onAddClick();
        }
      });



    }
  ]);
})();
