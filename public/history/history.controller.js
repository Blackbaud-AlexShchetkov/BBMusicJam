(function () {
  'use strict';
  angular.module('BBMusicJam.History', []).controller('HistoryController', [
    "$scope", "$filter", "$timeout", "$http", function ($scope, $filter, $timeout, $http) {

      var self = this;
      var locals = $scope.locals = {
        teams: [],
        historySet: [
          {
            id: 'someId',
            team: 'Hello',
            playlist: 'playlist 7',
            bestsong: 'Song 2'
          },
          {
            id: 'someId2',
            team: 'Hello 2',
            playlist: 'playlist 1',
            bestsong: 'Song 5'
          }
        ]
      };

      $http.get('/teams').then(function (result) {
        // status code between 200 and 299 considered success
        if (result.status >= 200 && result.status <= 299) {
          locals.historySet = result.data;
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
        self.gridOptions = {
          columns: [
            {
              caption: 'Team',
              jsonmap: 'teamname',
              id: 1,
              name: 'teamname',
              width_all: 300,
            },
            {
              caption: 'Playlist',
              jsonmap: 'playlist',
              id: 2,
              name: 'playlist',
              width_all: 500,
            },
            {
              caption: 'Best Song',
              jsonmap: 'bestsong',
              id: 3,
              name: 'bestsong',
              width_all: 500,
            },
            {
              caption: 'Date',
              jsonmap: 'date',
              id: 4,
              name: 'date',
              width_all: 300,
            },
          ],
          data: locals.historySet,
          multiselect: false,
          hideFilters: true,
          sortOptions: { excludedColumns: [] }, // no columns are excluded from sorting
          selectedColumnIds: [1, 2, 3, 4],
          hasMoreRows: false
        };

        $scope.$watch(function () {
          return self.gridOptions.sortOptions;
        }, function () {
          self.gridOptions.data.sort(function (a, b) {
            var descending = self.gridOptions.sortOptions.descending ? -1 : 1,
            sortProperty = self.gridOptions.sortOptions.column;
            if (a[sortProperty] > b[sortProperty]) {
              return (descending);
            } else if (a[sortProperty] < b[sortProperty]) {
              return (-1 * descending);
            } else {
              return 0;
            }
          });
        }, true);

        function search(array, text) {
            if (angular.isDefined(text) && text !== '') {
                return array.filter(function (element) {
                    var check = ((element.teamname.indexOf(text) > -1));
                    return check;
                });

            } else {
                return array;
            }
        }

        function filter(array, filters) {
            var i,
                item,
                newData = [];
            if (angular.isDefined(filters) && filters.team && filters.team.length > 0) {
                for (i = 0; i < filters.team.length; i++) {
                    item = filters.team[i];
                        newData.push.apply(newData, [locals.historySet[0], locals.historySet[1]]);
                        newData.push(locals.historySet[0]);
                }
                return newData;
            } else {
                return array;
            }
        }

        function filterAndSearch() {
            var filteredData = [],
                searchedData = [];

            filteredData = filter(locals.historySet, self.gridOptions.filters);
            searchedData = search(filteredData, self.gridOptions.searchText);
            self.gridOptions.data = searchedData;
        }

        $scope.$watch(function () {
            return self.gridOptions.searchText;
        }, function () {
            filterAndSearch();
        });

        $scope.$watch(function () {
            return self.gridOptions.filters;
        }, function () {
            filterAndSearch();
        });

      });
    }
  ]);
})();

// angular
// .module("BBMusicJam.History", ["sky", "ui.bootstrap", "ui.select"])
// .run(["$rootScope", "bbWait", function ($rootScope, bbWait) {
//    $rootScope.$on("bbBeginWait", function (e, opts) {
//        e.stopPropagation();
//        bbWait.beginPageWait(opts);
//    });
//
//    $rootScope.$on("bbEndWait", function (e, opts) {
//        e.stopPropagation();
//        bbWait.endPageWait(opts);
//    });
// }]);
//
// (function () {
//
//       function HistoryController($scope, $filter, $timeout) {
//
//       }
//
//       HistoryController.$inject = ['$scope', '$filter', '$timeout'];
//
//       angular.module('BBMusicJam.History')
//       .controller('HistoryController', HistoryController)
// }());
