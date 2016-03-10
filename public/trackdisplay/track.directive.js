(function() {
  "use strict";

  angular.module("BBMusicJam.tracks")
  .directive('trackListitem', function() {
    return {
      replace: 'true',
      templateUrl: 'trackdisplay/track_listitem.html'
    };
  });
})();
