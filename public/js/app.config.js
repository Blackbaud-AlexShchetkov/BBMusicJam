(function(){
  angular.module('BBMusicJam')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('home', {
      url: '/',
      templateUrl: '/home.html',
      controller: 'TrackListController as trackList'
    });

    $stateProvider.state('leaderboard', {
      url: '/leaderboard',
      templateUrl: 'leaderboard/leaderboard.html',
	    controller: 'LeaderboardController as leaderCtrl'
    });

    $stateProvider.state('history', {
      url: '/history',
      templateUrl: 'history/history.html',
	    controller: 'HistoryController as historyCtrl'
    });

    $stateProvider.state('profile', {
      url: '/profile',
      templateUrl: '/profile.html'
    });

  });
})();
