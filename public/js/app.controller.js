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
      vm.currentPlaylist = $cookies.get('playlistId');
      if(vm.currentUser===undefined)
      {
        vm.currentUser="null";
      }

      if(vm.currentUser=="null")
      {
        vm.currentPlaylist = "null";
      }
      else if(vm.currentPlaylist === undefined)
      {
        getTeams();
      }


      console.log(vm.currentUser);

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
          vm.currentPlaylist = data[0];
          $cookies.put("playlistId", vm.currentPlaylist);
          return data;
        })
        .error(function(data) {
          console.log("error getting teams: "+data);
        });
      }

      function getCurrentPlaylist()
      {
        $http.get("/playlist", { params: vm.currentPlaylist })
        .success(function(data)
        {
          return data;
        })
        .error(function(data){
          console.log("error getting current songs: " +data);
        });

        var currentTracks;
      }


    }

})();
