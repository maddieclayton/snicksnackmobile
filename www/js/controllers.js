angular.module('starter.controllers', ['ionic'])

.controller('PlaylistsCtrl', function($scope, $http) {
  var items = [];
  var displayedItems = [];
  var halls = []; //roma, wucox, whitman, forbes, grad, cjl
  var filters = []; //vgt, vgn
  var porkfree = false;
  var meal = 'l'; //breakfast 'b', lunch 'l', dinner 'd'
  var votes = {}; //id: true/false for key: value

  $http.get('http://sniksnak.herokuapp.com/api/get/').then(function(resp) {
    console.log('Get Success', resp);
    // For JSON responses, resp.data contains the result
    items = resp.data;
    //change('', '');
    getCurrentMeal();
  }, function(err) {
    console.error('Get Error', err, err.status);
    // err.status will contain the status code
  });

  //click event listeners for filter button
  document.getElementById ('forbes').addEventListener ('click',
    function() {highlight(document.getElementById ('forbes')); change('hall', 'Forbes');}, false);
  document.getElementById ('wucox').addEventListener ('click',
    function() {highlight(document.getElementById ('wucox')); change('hall', 'Wu/Wilcox');}, false);
  document.getElementById ('roma').addEventListener ('click',
    function() {highlight(document.getElementById ('roma')); change('hall', 'Rocky/Mathey');}, false);
  document.getElementById ('whitman').addEventListener ('click',
    function() {highlight(document.getElementById ('whitman')); change('hall', 'Whitman');}, false);
  document.getElementById ('cjl').addEventListener ('click', 
    function() {highlight(document.getElementById ('cjl')); change('hall', 'CJL');}, false);
  document.getElementById ('grad').addEventListener ('click', 
    function() {highlight(document.getElementById ('grad')); change('hall', 'Grad');}, false);

  document.getElementById ('vgt').addEventListener ('click', 
    function() {highlight(document.getElementById ('vgt')); change('filter', 'Vegetarian');}, false);
  document.getElementById ('vgn').addEventListener ('click', 
    function() {highlight(document.getElementById ('vgn')); change('filter', 'Vegan');}, false);
  
  document.getElementById ('porkfree').addEventListener ('click', 
    function() {
      porkfree = !porkfree;
      highlight(document.getElementById ('porkfree'));
      change('', '');}, false);


  function highlight(button) {
    button = angular.element(button.querySelector('.circle'));
    button.toggleClass('highlight');
  }

  function getCurrentMeal() {
    var time = new Date();
    var hour = time.getHours();
    var day = time.getDay();
    var newIndex = '';

    if (hour < 11) {
      if (day == 0 || day == 6) {
        newIndex = '1';
        meal = 'l';
      }
      else {
        newIndex = '0';
        meal = 'b';
      }
    }
    else if (hour < 14) {
      newIndex = '1';
      meal = 'l';
    }
    else {
      newIndex = '2';
      meal = 'd';
    }

    document.getElementById('mealSelect').selectedIndex = newIndex;
    change('', '');
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
    var id = item['Id'];

    if (!(id in votes)) {
      votes[id] = false;
      downpost(item);
    }
    else if (votes[id] == true) { //already upvoted
      votes[id] == false;
      downpost(item);
      downpost(item);
    }
    //else already downvoted, no change
    
    $scope.displayedItems = displayedItems;
  }

  function downpost (item) {
    item['Votes']--;
    $http.post('http://sniksnak.herokuapp.com/api/dec/' + item['Id']).then(
      function(resp) { /*console.log('Post Success', resp);*/ }, 
      function(err) { console.error('Post Error', err, err.status);
    });
  }

  $scope.upvote = function(item) {
    //console.log('downvote', item['Name']);
    var id = item['Id'];

    if (!(id in votes)) {
      votes[id] = true;
      uppost(item);
    }
    else if (votes[id] == false) { //already downvoted
      votes[id] == true;
      uppost(item);
      uppost(item);
    }
    //else already upvoted, no change
    
    $scope.displayedItems = displayedItems;
  }

  function uppost (item) {
    item['Votes']++;
    $http.post('http://sniksnak.herokuapp.com/api/inc/' + item['Id']).then(
      function(resp) { /*console.log('Post Success', resp);*/ }, 
      function(err) { console.error('Post Error', err, err.status);
    });
  }

  $scope.mealChange = function() {
    newMeal = document.getElementById('mealSelect').selectedIndex;
    //console.log('mealChange', newMeal);
    if (newMeal == 0) {meal = 'b';}
    else if (newMeal == 1) {meal = 'l';}
    else if (newMeal == 2) {meal = 'd';}
    change('','');
  }

})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
