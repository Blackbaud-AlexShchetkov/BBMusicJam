(function() {
  "use strict";
  angular.module("BBMusicJam")
    .controller("HomePageController", HomePageController);

    HomePageController.$inject = ['$uibModal', '$http', '$cookies'];

    function HomePageController($uibModal, $http, $cookies)
    {
      var vm = this;

      vm.openLoginDialog = openLoginDialog;
      vm.currentUser = $cookies.get('user');
      vm.currentTeam = "null";
      vm.getTrackList = getTrackList;
      vm.getIFrameSource = getIFrameSource;

      if(vm.currentUser===undefined)
      {
        vm.currentUser="null";
      }

      if(vm.currentUser=="null")
      {
        vm.currentTeam = "null";
      }
      else if(vm.currentTeam === undefined)
      {
        getTeams();
      }


      console.log(vm.currentUser);

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
          vm.currentTeam = data[0];
          $cookies.put("currentTeamName", vm.currentTeam.name);
          return data;
        })
        .error(function(data) {
          console.log("error getting teams: "+data);
        });
      }

      function getTrackList()
      {
        // console.log("trying to get playlist");
        // $http.get("/playlist", { params: $cookies.get('currentTeamName') })
        // .success(function(data)
        // {
        //   console.log("got current playlist: "+ data);
        //   vm.currentTeam = data;
        //   return data.tracks;
        // })
        // .error(function(data){
        //   console.log("error getting current songs: " +data);
        // });
        //
        // var currentTracks;
      }


    }

})();
