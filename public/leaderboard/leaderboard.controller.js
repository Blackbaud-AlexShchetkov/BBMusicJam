angular
.module("BBMusicJam.Leaderboard", ["sky", "ui.bootstrap", "ui.select"])
.run(["$rootScope", "$http", "bbWait", function ($rootScope, $http, bbWait) {
   $rootScope.$on("bbBeginWait", function (e, opts) {
       e.stopPropagation();
       bbWait.beginPageWait(opts);
   });

   $rootScope.$on("bbEndWait", function (e, opts) {
       e.stopPropagation();
       bbWait.endPageWait(opts);
   });
}]);

/*global angular, alert*/
//A comment

(function () {
    'use strict';

    function RunTemplateCache($templateCache) {
        $templateCache.put('bbGrid/samples/date.html', '<div>{{data | date: \'medium\'}}</div>');

        $templateCache.put('bbGrid/samples/gridtooltip.html',
                          '<div style="height: 70px; width: 300px;"><a>On your face</a></div>');
/*         $templateCache.put('bbGrid/samples/mycolumn.html',
            '<div>' +
                '<div>Title: {{data.title}}</div>' +
                '<a href="" tooltip-trigger="focus" tooltip-placement="bottom" bb-tooltip="bbGrid/samples/gridtooltip.html"> Info: {{data.info}}</a>' +
                '<button class="btn btn-success" ng-click="templateCtrl.clickIt()">My Button</button>' +
            '</div>'); */
    }

    function TemplateController($scope) {
        var self = this;

        self.clickIt = function () {
            alert('Column button clicked, id: ' + $scope.rowData.id);
        };
    }

    function LeaderboardController($scope, $filter, $timeout, $http, bbMoment) {

      // var dbUser = $http.get('/userInfo', {username: "tmorton"})
      //   .success(function (data){
      //     console.log("Data", data);
      //     console.log("Inside httpGet");
      //   })
      //   .error(function (data){
      //     console.log("Inside httpGet error")
      //   });
    //
    // var dbUser2 = $http.get('/userInfo', userData).then(function (){
    //   console.log("dbuser2");
    // });
    //

		// $scope.date = new Date();
		$scope.date = bbMoment().format('MMMM Do YYYY');

		$scope.leaderboardHeader = 'Daily leaderboard - ' + $scope.date;
    $scope.allTimeLeaderboardHeader = 'All time leaderboard';

        var newDataFlag = 0,
            action1,
            action2,
            allTimeLeaderSet = [],
            leaderboardSet = [],
            self = this;

            // $http.get('/userInfo', {params:{'username' : 'tmorton'}}).then(function (result) {
            //   result.data.name = toTitleCase(result.data.name);
            //   leaderboardSet[0] = result.data;
            //   console.log("Result Data 2", result.data);
            // });

            $http.get('/users').then(function (result) {
              if (result.status >= 200 && result.status <= 299) {
                leaderboardSet = result.data;
                angular.forEach(leaderboardSet, function (user) {
                  user.name = toTitleCase(user.name);
                });
              }
            });

        function toTitleCase(str) {
          if (typeof str === 'string')
          return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }
        function applyFilters() {
            self.appliedFilters.points = [];
            if (self.guitarFilter) {
                self.appliedFilters.points.push({name: 'guitars'});
            }
            if (self.drumsFilter) {
                self.appliedFilters.points.push({name: 'drums'});
            }
        }

        function updateActions(selections) {
            var i,
                selection;

            action1.selections = [];
            action2.selections = [];

            for (i = 0; i < selections.length; i++) {
                selection = selections[i];
                if (selection.point.indexOf('guitar') > -1) {
                    action1.selections.push(selection);
                } else if (selection.point.indexOf('Drum') > -1) {
                    action2.selections.push(selection);
                }
            }
        }

        function action1Clicked() {
            var i,
                message = 'The selected guitar players are ';
            if (action1.selections && action1.selections.length > 0) {
                for (i = 0; i < action1.selections.length; i = i + 1) {
                    message += action1.selections[i].name;
                    if (i !== (action1.selections.length - 1)) {
                        message += ', ';
                    }
                }
                alert(message);
            }
        }

        function action2Clicked() {
            var message = 'Drum Drum Drum!';

            alert(message);
        }


        /* action1 = {
            actionCallback: action1Clicked,
            automationId: 'Action1Button',
            isPrimary: true,
            selections: [],
            title: 'Guitar Action'
        };

        action2 = {
            actionCallback: action2Clicked,
            automationId: 'Action2Button',
            isPrimary: false,
            selections: [],
            title: 'Drum Action'
        }; */

        self.appliedFilters = {
            points: []
        };

        self.clickCustom = function () {
            alert('custom button clicked');
        };

        self.filterOptions = {
            applyFilters: function (args) {
                applyFilters();
                args.filters = angular.copy(self.appliedFilters);
            },
            clearFilters: function (args) {
                self.guitarFilter = false;
                self.drumsFilter = false;
                applyFilters();
                args.filters = angular.copy(self.appliedFilters);
            }
        };

        self.gridActions = [
            action1,
            action2
        ];
        $timeout(function () {
            self.gridOptions = {
                columns: [
                    {
                        caption: 'Submitted By',
                        jsonmap: 'name',
                        id: 1,
                        name: 'name',
                        category: 'Users',
                        description: 'List of users'
                    },
										{
                        caption: 'Song',
                        jsonmap: 'song',
                        id: 2,
                        name: 'song',
                        width_all: 500
                    },
                    {
                        caption: 'Points',
                        jsonmap: 'points',
                        id: 3,
                        name: 'points'
                    },
                ],
                data: leaderboardSet,
                multiselect: false,	// this controls check boxes
                sortOptions: { excludedColumns: ['song'] }, // no columns are excluded from sorting
				        hideFilters: true,
                selectedColumnIds: [1, 2, 3],
                columnPickerHelpKey: 'bb-security-users.html',
                columnPickerMode: 'list',
				        hasMoreRows: false // Causes "load more" button to appear
            };

            self.allTimeGridOptions = {
              columns: [
                  {
                      caption: 'Submitted By',
                      jsonmap: 'name',
                      id: 1,
                      name: 'name',
                      category: 'Users',
                      description: 'List of users'
                  },
                  {
                      caption: 'Song',
                      jsonmap: 'song',
                      id: 2,
                      name: 'song',
                      width_all: 500
                  },
                  {
                      caption: 'Points',
                      jsonmap: 'points',
                      id: 3,
                      name: 'points'
                  },
              ],
              data: allTimeLeaderSet,
              multiselect: false,	// this controls check boxes
              sortOptions: { excludedColumns: ['song'] }, // no columns are excluded from sorting
              hideFilters: true,
              selectedColumnIds: [1, 2, 3],
              columnPickerHelpKey: 'bb-security-users.html',
              columnPickerMode: 'list',
              hasMoreRows: false // Causes "load more" button to appear
            };

			// Include in above object to get context menus
		    /*     getContextMenuItems: function (rowid, rowObject) {
                        return [
                            {
								id: 'menu',
                                title: 'Option1',
                                cmd: function () {
                                    alert('Context menu option chosen!');
                                    return false;
                                }
                            }
                        ];
                },  */

            self.guitarFilter = false;

            self.drumsFilter = false;

            self.updateActions = updateActions;

            self.setSelections = setSelections;

            self.selectedRows = [leaderboardSet[1]];

            function setSelections() {
                self.selectedRows = [leaderboardSet[3]];
            }

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
                      console.log("Element", element);
                        var check = ((element.name.indexOf(text) > -1));
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
                if (angular.isDefined(filters) && filters.points && filters.points.length > 0) {
                    for (i = 0; i < filters.points.length; i++) {
                        item = filters.points[i];
                        if (item.name === 'guitars') {
                            newData.push.apply(newData, [leaderboardSet[0], leaderboardSet[1], leaderboardSet[2]]);
                        }
                        if (item.name === 'drums') {
                            newData.push(leaderboardSet[3]);
                        }
                    }
                    return newData;
                } else {
                    return array;
                }
            }

            function filterAndSearch() {
                var filteredData = [],
                    searchedData = [];

                filteredData = filter(leaderboardSet, self.gridOptions.filters);
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

            // Causes "load more" button to appear
            // self.gridOptions.hasMoreRows = false;

            /* This function creates unique data sets to be appended to our
               grid */
            /* function getLoadMoreDataSet() {
                var i,
                    newData;

                newData = angular.copy(leaderboardSet);

                for (i = 0; i < leaderboardSet.length; i++) {
                    newData[i].flag = newDataFlag;
                }
                newDataFlag++;
                return newData;
            } */

/*             $scope.$on('loadMoreRows', function (event, data) {
					   // If a promise exists on the event data, then we can resolve
                       // it with the next set of data that should be concatenated
                       // to the grid
                self.gridOptions.loading = true;
                $timeout(function () {
                    data.promise.resolve(getLoadMoreDataSet());
                    self.gridOptions.loading = false;
                }, 2000);

            }); */

            $scope.$on('includedColumnsChanged', function (event, data) {
                // Optionally set the data's willResetData property to true if the controller will handle reloading the results
                // after the user has changed the selected grid columns.
            });
        });
    }


    RunTemplateCache.$inject = ['$templateCache'];

    TemplateController.$inject = ['$scope'];

    LeaderboardController.$inject = ['$scope', '$filter', '$timeout', '$http', 'bbMoment'];

    angular.module('BBMusicJam.Leaderboard')
    .run(RunTemplateCache)
    .controller('TemplateController', TemplateController)
    .controller('LeaderboardController', LeaderboardController)

}());
