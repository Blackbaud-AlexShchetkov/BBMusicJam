(function() {
  "use strict";
  angular.module("BBMusicJam")
    .controller("HomePageController", HomePageController);

    HomePageController.$inject = ['$uibModal', '$http', '$cookies'];

    function HomePageController($uibModal, $http, $cookies)
    {
      var vm = this;

      vm.testFunction = testFunction;
      vm.playSong = playSong;
      vm.openLoginDialog = openLoginDialog;
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

      function playSong(songId)
      {
        window.open("https://play.spotify.com/track/"+vm.currentTrackList[songId].id+"?play=true","spotifyTab");
      }
      function getIFrameSource(songId)
      {
        return "https://embed.spotify.com/?uri=spotify:track:"+songId;
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
          vm.currentTrackList = data.tracks;
          return data.tracks;
        })
        .error(function(data){
          console.log("error getting current songs: " +data);
        });

        var currentTracks;
      }


    }

})();
