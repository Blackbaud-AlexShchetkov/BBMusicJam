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
	                    $scope.previewPlaying = false;
	                    $scope.trackSelection = {track: null};
	                    $scope.resources = {
	                        watermark: 'Search for a song'
	                    };

	                    $scope.playPreview = function(url) {
	                        if (audioObject) {
	                            audioObject.pause();
	                        }
	                        audioObject = new Audio(url);
	                        audioObject.play();
	                        $scope.previewPlaying = true;
	                        audioObject.addEventListener('ended', function () {
	                            audioObject = null;
	                            $scope.previewPlaying = false;
	                            $scope.$apply();
	                        });
	                        audioObject.addEventListener('pause', function () {
	                            audioObject = null;
	                            $scope.previewPlaying = false;
	                            $scope.$apply();
	                        });
	                    };

	                    $scope.stopPreview = function() {
                            if (audioObject) {
                                audioObject.pause();
                                audioObject = null;
                                $scope.previewPlaying = false;
                            }
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