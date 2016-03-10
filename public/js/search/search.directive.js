(function(){
	'use strict';
	angular.module('BBMusicJam').directive("searchDropDown", [
	    function() {
	        return {
	            restrict: 'E',
                replace: true,
	            scope: {},
	            templateUrl: 'js/search/searchDropDownTemplate.html',
                //template: '<div>lol</div>',
	            controller: [
                    "$scope",  "$http", function ($scope, $http) {
                        var searchUrl = 'https://api.spotify.com/v1/search';
	                    var audioObject = null;
	                    $scope.selectedSong = {};
	                    $scope.resources = {
	                        watermark: 'Search for a song'
	                    };
	                    $scope.color_id = '2';
                        $scope.colors  = [
                            { id: '1', name: 'Aqua' },
                            { id: '2', name: 'Blue' },
                            { id: '3', name: 'Brown' },
                            { id: '4', name: 'Gold' },
                            { id: '5', name: 'Gray' },
                            { id: '6', name: 'Green' },
                            { id: '7', name: 'Navy' },
                            { id: '8', name: 'Pink' },
                            { id: '9', name: 'Purple' },
                            { id: '10', name: 'Silver' },
                            { id: '11', name: 'White' },
                            { id: '12', name: 'Yellow' }
                        ];

	                    $scope.playPreview = function(url) {
	                        if (audioObject) {
	                            audioObject.pause();
	                        }
	                        audioObject = new Audio(url);
	                        audioObject.play();
	                    };

	                    $scope.searchTracks = function(query) {

	                        if (query && query.length > 0) {
	                            return $http.get(
	                                searchUrl,
	                                {
	                                    params: {
	                                        q: query,
	                                        type: 'track'
	                                    }
	                                }
	                            ).then(function(response) {
	                                $scope.resultList = response.data.tracks.items;
	                                $scope.$broadcast('bbSearchFinished');
	                            });
	                        }
	                        //if(query && query.length > 0) {
	                        //    return $.ajax({
	                        //        url: searchUrl,
	                        //        data: {
	                        //            q: query,
	                        //            type: 'track'
	                        //        },
	                        //        success: function(response) {
	                        //            $scope.resultList = response.tracks.items;
	                        //            $scope.$broadcast('bbSearchFinished');
	                        //        }
	                        //    });
	                        //}
	                    };
	                }
	            ]
	        };
	    }
	]);
})();