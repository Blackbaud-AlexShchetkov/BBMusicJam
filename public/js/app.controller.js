(function() {
  "use strict";
  angular.module("BBMusicJam")
    .controller("HomePageController", HomePageController);

    HomePageController.$inject = ['$uibModal'];

    function HomePageController($uibModal)
    {
      var vm = this;

      function openLoginDialog()
      {
        $uibModal.open({
          templateUrl: 'js/login/login.dialog.html',
          controller: 'LoginController as loginController'
        });
      }
      vm.openLoginDialog = openLoginDialog;
    }

})();
