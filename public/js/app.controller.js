(function() {
  "use strict";
  angular.module("BBMusicJam")
    .controller("HomePageController", HomePageController);

    HomePageController.$inject = ['$uibModal', '$http'];

    function HomePageController($uibModal, $http)
    {
      var vm = this;

      vm.openLoginDialog = openLoginDialog;


      function openLoginDialog()
      {
        $uibModal.open({
          templateUrl: 'js/login/login.dialog.html',
          controller: 'LoginController as loginController'
        });
      }


    }

})();
