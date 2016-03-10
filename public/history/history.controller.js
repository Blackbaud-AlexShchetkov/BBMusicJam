(function () {
  'use strict';
  angular.module('BBMusicJam.History', []).controller('HistoryController', [
    "$scope", function () {
      console.log("Hello History!");
    }
  ]);
})();

// angular
// .module("BBMusicJam.History", ["sky", "ui.bootstrap", "ui.select"])
// .run(["$rootScope", "bbWait", function ($rootScope, bbWait) {
//    $rootScope.$on("bbBeginWait", function (e, opts) {
//        e.stopPropagation();
//        bbWait.beginPageWait(opts);
//    });
//
//    $rootScope.$on("bbEndWait", function (e, opts) {
//        e.stopPropagation();
//        bbWait.endPageWait(opts);
//    });
// }]);
//
// (function () {
//
//       function HistoryController($scope, $filter, $timeout) {}
//
//       HistoryController.$inject = ['$scope', '$filter', '$timeout'];
//
//       angular.module('BBMusicJam.History')
//       .controller('HistoryController', HistoryController)
// }());
