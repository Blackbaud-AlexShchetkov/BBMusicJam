(function() {
  var globalName = "dunno";

  function TopNavController() {
    var vm = this;
    var authenticated = true;
    vm.isAuthenticated = function() { return authenticated; };
    vm.authenticate = function() { authenticated = true; };
    vm.invalidate = function() { authenticated = false; };
  }
  function ModalTestController(bbModal) {
      var self = this;
      self.open = function () {
          bbModal.open({
              controller: 'ModalContentController as contentCtrl',
              templateUrl: 'demo/modal/modalform.html'
          });
      };


  }

  function ModalContentController() {
    var self = this;
    self.saveName = function(newName) {
      globalName = newName;
      alert(newName);
    };


  }

  ModalTestController.$inject = ['bbModal'];

  angular.module('renxtClone', ['sky'])
  .controller("TopNavController", TopNavController)
  .controller('ModalContentController', ModalContentController)
  .controller('ModalTestController', ModalTestController);

})();
