(function(){
  "use strict";

  angular.module("login.system")
    .controller("LoginController", LoginController);

    LoginController.$inject = ['$uibModalInstance', '$http'];
    function LoginController($uibModalInstance, $http)
    {
      var vm = this;

      vm.emailInput = "";
      vm.passwordInput = "";

      vm.attemptLogin = attemptLogin;

      function attemptLogin() {
        var data = {"username":vm.emailInput, "password":vm.passwordInput};
        $http.get('/loginUser', data)
        .success(function (data) {

        })
        .error(function (data) {
          console.log('Error:' + data);
        });
      }
    }
})();
