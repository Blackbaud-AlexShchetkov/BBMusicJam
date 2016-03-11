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
                    "$scope",  "$http", "$cookies", function ($scope, $http, $cookies) {
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

											$scope.addSongToPlaylist = function()
											{
												console.log($cookies.get("currentTeamName"));
												var newTrack = {"id":$scope.trackSelection.track.id,
																		 "name": $scope.trackSelection.track.name,
																	 	 "artists": $scope.trackSelection.track.artists,
																	 	 "album": $scope.trackSelection.track.album.name,
																	 	 "cover_url": $scope.trackSelection.track.album.images[2],
																	 	 "added_by": $cookies.get("user")};
												var data = {"currentTeamName":$cookies.get("currentTeamName"), "track": newTrack};
												$http.post('/addTrackToPlaylist', data)
												.success(function(data)
											{
												console.log("add song success: "+data);
											})
											.error(function(data){
												console.log("error adding song: "+data);
											});
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

	                    $scope.$watch('trackSelection.track', function(nv, ov) {
												console.log($scope.trackSelection.track);
	                        if (audioObject && !angular.equals(nv, ov)) {
	                            audioObject.pause();
	                            audioObject = null;
	                            $scope.previewPlaying = false;
	                        }
	                    });
	                }
	            ]
	        };
	    }
	]);
})();
