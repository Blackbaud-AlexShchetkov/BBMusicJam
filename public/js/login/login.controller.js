(function(){
  "use strict";

  angular.module("login.system")
    .controller("LoginController", LoginController);

    LoginController.$inject = ['$uibModalInstance', '$http', '$uibModal', '$cookies'];
    function LoginController($uibModalInstance, $http, $uibModal, $cookies)
    {
      var vm = this;

      vm.emailInput = "";
      vm.passwordInput = "";

      vm.attemptLogin = attemptLogin;
      vm.openRegisterDialog = openRegisterDialog;

      vm.registerName = "";
      vm.registerLastName = "";
      vm.registerPassword = "";
      vm.registerPasswordConfirm = "";
      vm.register = register;

      function attemptLogin() {
        var data = {"username":vm.emailInput, "password":vm.passwordInput};
        $http.get('/loginUser', { params: data })
        .success(function (data) {
          if(data===true)
          {
            $cookies.put('user', vm.emailInput);
          }
        })
        .error(function (data) {
          console.log('Error:' + data);
        });
      }

      function openRegisterDialog()
      {
        console.log("opening register");
        $uibModal.open({
          templateUrl: 'js/login/register.html',
          controller: 'LoginController as loginController'
        });
      }

      function register()
      {
        if(vm.registerPassword!=vm.registerPasswordConfirm)
        {
          window.alert("Passwords do not match");
        }
        else {
          var data = {"username": vm.registerName,
                      "name": vm.registerLastName,
                      "password": vm.registerPassword,
                      "points": 0};
          $http.post('/registerUser', data)
          .success(function (data) {
            console.log(data);
          })
          .error(function (data) {
            console.log('Error:' + data);
          });
        }

      }


    }
})();
