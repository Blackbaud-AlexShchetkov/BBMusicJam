(function() {
  "use strict";

  angular.module("BBMusicJam.tracks")
  .directive('trackListitem', function() {
    return {
      templateUrl: 'trackdisplay/track_listitem.html'
    };
  });
})();
