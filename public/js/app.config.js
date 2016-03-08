(function(){
  angular.module('BBMusicJam')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: '/home.html'
    });

    $stateProvider.state('leaderboard', {
      url: '/leaderboard',
      templateUrl: '/leaderboard.html'
    });

    $stateProvider.state('profile', {
      url: '/profile',
      templateUrl: '/profile.html'
    });


    $urlRouterProvider.otherwise('home');

  });
})();
