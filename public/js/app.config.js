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

    $stateProvider.state('team', {
        url: '/team',
        templateUrl: 'team/team.html',
        controller: 'TeamController as teamCtrl'
    });

    $stateProvider.state('user', {
      url: '/user',
      templateUrl: 'user/user.list.html',
      controller: 'UserListController as userListCtrl'
    });

    $stateProvider.state('userdetail', {
      url: '/user/:username',
      templateUrl: 'user/user.detail.html',
      controller: 'UserDetailController as userCtrl'
    });

    $stateProvider.state('profile', {
      url: '/profile',
      templateUrl: '/profile.html'
    });

  });
})();
