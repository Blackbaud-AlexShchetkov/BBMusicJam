(function(){
  "use strict";
  angular.module("login.system")
    .controller("LoginController", LoginController);
    LoginController.$inject = ['$uibModalInstance'];
    function LoginController($uibModalInstance)
    {
      var vm = this;

      vm.usernameInput = "";
      vm.passwordInput = "";

      vm.attemptLogin = attemptLogin;

      function attemptLogin() {
        
      }
    }
})();
