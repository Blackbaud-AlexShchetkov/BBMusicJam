(function () {
    'use strict';
    angular.module('BBMusicJam').directive("selectPlaylist", [
	    function () {
	        return {
	            restrict: 'E',
	            replace: true,
	            scope: {},
	            templateUrl: 'js/selectPlaylist/selectPlaylistTemplate.html',
	            //template: '<div>lol</div>',
	            controller: [
	                "$scope", "$http", "$cookies", function($scope, $http, $cookies) {
	                    $scope.selectedItem = 'Coke';
	                    $scope.swag = {
	                        items: []
	                    };
	                    $scope.allTeams = [];
                        $scope.getTeams = function() {
                            $http.get('/teams', { params: { username: $cookies.get('user') } })
                                .then(function (response) {
                                $scope.swag.items = response.data;

                            });
                        };

                        $scope.getPlaylist = function(teamname) {
                            $cookies.put('currentTeamName', teamname + '');
                        };

	                    $scope.getTeams();
	                }
	            ]
	        };
	    }
    ]);
})();
