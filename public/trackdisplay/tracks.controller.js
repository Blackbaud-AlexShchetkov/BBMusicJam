(function() {
  "use strict";
  angular.module("BBMusicJam.tracks")
  .controller("TrackListController", TrackListController);

  angular.$inject = ["$http"];

  function TrackListController($http)
  {
    var vm = this;

    vm.getTrackList = getTrackList;
    vm.addTrack = addRandomTrack;
    vm.currentSong = null;
    vm.currentSongUpvoteStatus = 0;
    vm.playing = 0;




    function getTrackList() {
      console.log("getting tracks");
      $http.get('/tracks')
      .success(function (data) {
        vm.tracks = data;
        return data;
      })
      .error(function (data) {
        console.log('Error:' + data);
      });
    }

    function addRandomTrack()
    {
      console.log("adding random track");
      var newTrack = {"id":Math.random(),
                      "name": "TrackName",
                      "artists": ["artist 1", "artist2"],
                      "album": "album name",
                      "date_added": Date.now,
                      "username": "mime"};

      $http.post('/tracks', newTrack)
      .success(function (data) {
        return true;
      })
      .error(function (data) {
        console.log('Error:' + data);
      });
    }

    function upvoteCurrentSong()
    {

    }
    function downvoteCurrentSong()
    {

    }

    function getCurrentSong()
    {

    }



  }

})();
