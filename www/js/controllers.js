angular.module('starter.controllers', ['ionic'])

.controller('PlaylistsCtrl', function($scope, $http) {
  var items = [];
  var displayedItems = [];
  var halls = []; //roma, wucox, whitman, forbes, grad, cjl
  var filters = []; //vgt, vgn
  var porkfree = false;
  var meal = 'l';

  $http.get('http://sniksnak.herokuapp.com/api/get/').then(function(resp) {
    console.log('Get Success', resp);
    // For JSON responses, resp.data contains the result
    items = resp.data;
    change('', '');
  }, function(err) {
    console.error('Get Error', err, err.status);
    // err.status will contain the status code
  });

  //click event listeners for filter button
  document.getElementById ('forbes').addEventListener ('click',
    function() {maddiesucks(document.getElementById ('forbes'));change('hall', 'Forbes');}, false);
  document.getElementById ('wucox').addEventListener ('click',
    function() {maddiesucks(document.getElementById ('wucox'));change('hall', 'Wu/Wilcox');}, false);
  document.getElementById ('roma').addEventListener ('click',
    function() {maddiesucks(document.getElementById ('roma'));change('hall', 'Rocky/Mathey');}, false);
  document.getElementById ('whitman').addEventListener ('click',
    function() {maddiesucks(document.getElementById ('whitman'));change('hall', 'Whitman');}, false);
  document.getElementById ('cjl').addEventListener ('click', 
    function() {maddiesucks(document.getElementById ('cjl'));change('hall', 'CJL');}, false);
  document.getElementById ('grad').addEventListener ('click', 
    function() {maddiesucks(document.getElementById ('grad'));change('hall', 'Grad');}, false);

  document.getElementById ('vgt').addEventListener ('click', 
    function() {change('filter', 'Vegetarian');}, false);
  document.getElementById ('vgn').addEventListener ('click', 
    function() {change('filter', 'Vegan');}, false);
  
  document.getElementById ('porkfree').addEventListener ('click', 
    function() {
      porkfree = !porkfree;
      change('', '');}, false);

  function maddiesucks(button) {
    button = angular.element(button.querySelector('.circle'));
    button.toggleClass('highlight');
  }

  //called on load and after each filter click
  function change(type, button) {
    var index = -2;
    //update hall/filter

    if (type == 'hall') {
      index = halls.indexOf(button);
      if(index == -1)
        halls.push(button);
      else
        halls.splice(index, 1);
    }
    else if (type == 'filter') {
      index = filters.indexOf(button);
      if(index == -1)
        filters.push(button);
      else
        filters.splice(index, 1);
    }
    //update displayedItems
    displayedItems = [];
    for (i = 0; i < items.length; i++) {
      item = items[i];
      var addItem = true;

      if (meal == item['Meal']) {
        itemFilters = item['Filters'];
        for (j = 0; j < filters.length; j++) {
          if (itemFilters.indexOf(filters[j]) == -1) {
            addItem = false;
            break;
          }
        }
        if (addItem && porkfree && itemFilters.indexOf('Pork') != -1)
          addItem = false;
        if (addItem && halls.length != 0 && halls.indexOf(item['Hall']) == -1)
          addItem = false;
      }
      else {addItem = false;}

      if (addItem == true)
        displayedItems.push(item);
    }
    $scope.displayedItems = displayedItems;
  }

  $scope.downvote = function(item) {
    //console.log('downvote', item['Name']);
    item['Votes']--;
    $scope.displayedItems = displayedItems;

    $http.post('http://sniksnak.herokuapp.com/api/dec/' + item['Id']).then(
      function(resp) { /*console.log('Post Success', resp);*/ }, 
      function(err) { console.error('Post Error', err, err.status);
    });
  }

  $scope.upvote = function(item) {
    //console.log('upvote', item['Name']);
    item['Votes']++;
    $scope.displayedItems = displayedItems;

    $http.post('http://sniksnak.herokuapp.com/api/inc/' + item['Id']).then(
      function(resp) { /*console.log('Post Success', resp);*/ },
      function(err) { console.error('Post Error', err, err.status);
    });
  }

  $scope.mealChange = function() {
    newMeal = document.getElementById('mealSelect').selectedIndex;
    console.log('mealChange', newMeal);
    if (newMeal == 0) {meal = 'b';}
    else if (newMeal == 1) {meal = 'l';}
    else if (newMeal == 2) {meal = 'd';}
    change('','');
  }

})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
