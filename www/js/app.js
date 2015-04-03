// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
  })

  .state('app.Popularity', {
    url: "/Popularity",
    views: {
      'menuContent': {
         templateUrl: "templates/Popularity.html",
         controller: 'PlaylistsCtrl'
       }
    }
   })

  .state('app.Psingle', {
    url: "/Popularity/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.Rocky', {
    url: "/Rocky",
    views: {
      'menuContent': {
         templateUrl: "templates/Rocky.html",
         controller: 'PlaylistsCtrl'
       }
    }
   })

  .state('app.Rsingle', {
    url: "/Rocky/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.Forbes', {
    url: "/Forbes",
    views: {
      'menuContent': {
         templateUrl: "templates/Forbes.html",
         controller: 'PlaylistsCtrl'
       }
    }
   })

  .state('app.Fsingle', {
    url: "/Forbes/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.Whitman', {
    url: "/Whitman",
    views: {
      'menuContent': {
         templateUrl: "templates/Whitman.html",
         controller: 'PlaylistsCtrl'
       }
    }
   })

  .state('app.Whsingle', {
    url: "/Whitman/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.JCL', {
    url: "/JCL",
    views: {
      'menuContent': {
         templateUrl: "templates/JCL.html",
         controller: 'PlaylistsCtrl'
       }
    }
   })

  .state('app.Jsingle', {
    url: "/JCL/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.Grad', {
    url: "/Grad",
    views: {
      'menuContent': {
         templateUrl: "templates/Grad.html",
         controller: 'PlaylistsCtrl'
       }
    }
   })

  .state('app.Gsingle', {
    url: "/Grad/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('app.Wu', {
    url: "/Wu",
    views: {
      'menuContent': {
         templateUrl: "templates/Wu.html",
         controller: 'PlaylistsCtrl'
       }
    }
   })

  .state('app.Wsingle', {
    url: "/Wu/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/Popularity');
});
