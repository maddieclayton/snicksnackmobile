angular.module('starter.controllers', [])



.controller('PlaylistsCtrl', function($scope) {
  var items = ["W: Nuggets", "F: Melon"];
  var filters = [];
  var F = false;
  var Wu = false;
  var R = false;
  var Wh = false;
  var J = false;
  var G = false;
  $scope.change = function() {
    items1 = [];
    for(filter in filters) {
      for(item in items) {
        if(item.substring(0, 1) == filter)
          items1.push(item)
      }
    }
    items = items1;
    window.location.reload(true)
  }
  $scope.Forbes = function() {
    if(F) {
      filters.push("F")
    }
    else {
      filter1 = [];
      for(filter in filters) {
        if(filter != "F") {
          filter1.push(filter);
        }
      }
      filters = filter1;
      change()
    }
  }
  $scope.Wu = function() {
    if(F) {
      filters.push("W")
    }
    else {
      filter1 = [];
      for(filter in filters) {
        if(filter != "W") {
          filter1.push(filter);
        }
      }
      filters = filter1;
      change()
    }
  }
  $scope.Popularity = items;
  $scope.Whitman = function() {
    if(F) {
      filters.push("H")
    }
    else {
      filter1 = [];
      for(filter in filters) {
        if(filter != "H") {
          filter1.push(filter);
        }
      }
      filters = filter1;
      change()
    }
  }
  $scope.Rocky = function() {
    if(F) {
      filters.push("R")
    }
    else {
      filter1 = [];
      for(filter in filters) {
        if(filter != "R") {
          filter1.push(filter);
        }
      }
      filters = filter1;
      change()
    }
  }
  $scope.CJL = function() {
    if(F) {
      filters.push("C")
    }
    else {
      filter1 = [];
      for(filter in filters) {
        if(filter != "C") {
          filter1.push(filter);
        }
      }
      filters = filter1;
      change()
    }
  }
  $scope.Grad = function() {
    if(F) {
      filters.push("G")
    }
    else {
      filter1 = [];
      for(filter in filters) {
        if(filter != "G") {
          filter1.push(filter);
        }
      }
      filters = filter1;
      change()
    }
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
