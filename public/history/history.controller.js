(function () {
  'use strict';
  angular.module('BBMusicJam.History', []).controller('HistoryController', [
    "$scope", "$filter", "$timeout", function ($scope, $filter, $timeout) {

      console.log("Hello History!");

      var self = this;
      var locals = $scope.locals = {
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

      $timeout(function () {
        console.log("Inside $timeout function");
        self.gridOptions = {
          columns: [
            {
              caption: 'Team',
              jsonmap: 'team',
              id: 1,
              name: 'team',
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
          console.log("Search array", array);
          console.log("Search text", text);
            if (angular.isDefined(text) && text !== '') {
                return array.filter(function (element) {
                    var check = ((element.team.indexOf(text) > -1) ||
                           (element.bestsong.indexOf(text) > -1) ||
                           (element.playlist.indexOf(text) > -1));
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
            console.log("Search Data", searchedData);
            debugger;
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
