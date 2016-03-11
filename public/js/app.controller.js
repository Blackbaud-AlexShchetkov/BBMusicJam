(function() {
  "use strict";
  angular.module("BBMusicJam")
    .controller("HomePageController", HomePageController);

    HomePageController.$inject = ['$uibModal', '$http', '$cookies', '$sce'];

    function HomePageController($uibModal, $http, $cookies, $sce)
    {
      var vm = this;

      vm.getCurrentSongImageUrl = getCurrentSongImageUrl;
      vm.testFunction = testFunction;
      vm.playSong = playSong;
      vm.openLoginDialog = openLoginDialog;
      vm.logOut = logOut;
      vm.currentUser = $cookies.get('user');
      vm.currentTeam = "null";
      vm.getIFrameSource = getIFrameSource;
      vm.currentTrackList = undefined;
      getTrackList();

      console.log(vm.currentUser);
      if(vm.currentUser===undefined)
      {
        vm.currentUser="null";
      }

      if(vm.currentUser=="null")
      {
        vm.currentTeam = "null";
      }
      else if(vm.currentTeam == "null")
      {
        getTeams();

      }

      function testFunction()
      {
        console.log("simple test");
      }

      function getCurrentSongImageUrl(songId)
      {
        console.log(songId + "song id");
        return $sce.trustAsResourceUrl(vm.currentTrackList[songId].cover_url);
      }

      function playSong(songId)
      {
        window.open("https://play.spotify.com/track/"+vm.currentTrackList[songId].id+"?play=true","spotifyTab");
      }
      function getIFrameSource(songId)
      {

        return $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:track:"+songId);
      }

      function openLoginDialog()
      {
        $uibModal.open({
          templateUrl: 'js/login/login.dialog.html',
          controller: 'LoginController as loginController'
        });
      }

      function getTeams()
      {
        $http.get('/teams', vm.currentUser)
        .success(function(data) {
          console.log("getTeams returned: "+data);
          console.log(data[0]);
          vm.currentTeam = data[0];
          $cookies.put("currentTeamName", vm.currentTeam.teamname);
          console.log("team name was set to: "+vm.currentTeam.teamname);
          return data;
        })
        .error(function(data) {
          console.log("error getting teams: "+data);
        });
      }

      function getTrackList()
      {
        console.log("trying to get playlist");
        $http.get("/playlist", { params: {"teamname":$cookies.get('currentTeamName')} })
        .success(function(data)
        {
          console.log("got current playlist: "+ data);
          console.log(data);
          vm.currentTrackList = data.tracks;
          playSong(0);
          $cookies.put("currentPlaylistId", data._id);
          return data.tracks;
        })
        .error(function(data){
          console.log("error getting current songs: " +data);
        });

        var currentTracks;
      }

        function logOut() {
            $cookies.put('user', 'null');
            vm.currentUser = $cookies.get('user');
        }

        vm.currentSong = null;
        vm.currentSongUpvoteStatus = 0;
        vm.playing = false;
        vm.play = play;
        vm.pause = pause;
        vm.upvote = upvote;
        vm.downvote = downvote;
        vm.repeat = false;
        vm.toggleRepeat = toggleRepeat;

        function toggleRepeat()
        {
          vm.repeat = !vm.repeat;
        }

        function upvote()
        {
          if(vm.currentSongUpvoteStatus===0||vm.currentSongUpvoteStatus==-1)
          {
            vm.currentSongUpvoteStatus=1;
          }
          else
          {
            vm.currentSongUpvoteStatus = 0;
          }
        }

        function downvote()
        {
          if(vm.currentSongUpvoteStatus===0||vm.currentSongUpvoteStatus==1)
          {
            vm.currentSongUpvoteStatus=-1;
          }
          else
          {
            vm.currentSongUpvoteStatus = 0;
          }
        }

        function play()
        {
          vm.playing = true;

        }

        function pause()
        {
          vm.playing = false;
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
