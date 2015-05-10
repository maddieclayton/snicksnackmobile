angular.module('starter.controllers', ['ionic'])

.controller('PlaylistsCtrl', function($scope, $http) {
  var items = [];
  var displayedItems = [];
  var halls = []; //Rocky/Mathey, Wu/Wilcox, Whitman, Forbes, Grad, CJL
  var filters = []; //Vegetarian, Vegan
  var freeFilters = []; //Pork, Nuts
  var meal = 'l'; //breakfast 'b', lunch 'l', dinner 'd'
  var votes = {}; //id: true/false for key: value

  $http.get('http://sniksnak.herokuapp.com/api/get/').then(function(resp) {
    console.log('Get Success', resp);
    // For JSON responses, resp.data contains the result
    items = resp.data;
    getCurrentMeal();
  }, function(err) {
    console.error('Get Error', err, err.status);
    // err.status will contain the status code
  });

  //click event listeners for filter buttons
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
    function() {highlight(document.getElementById ('porkfree')); change('freeFilter', 'Pork');}, false);
  document.getElementById ('nutfree').addEventListener ('click', 
    function() {highlight(document.getElementById ('nutfree')); change('freeFilter', 'Nuts');}, false);

  function highlight(button) {
    button = angular.element(button.querySelector('.circle'));
    button.toggleClass('highlight');
  }

  function getCurrentMeal() {
    var time = new Date();
    var hour = time.getHours();
    var day = time.getDay();
    var newIndex = -1;

    if (hour < 11) {
      if (day == 0 || day == 6) {
        newIndex = 1;
        meal = 'l';
      }
      else {
        newIndex = 0;
        meal = 'b';
      }
    }
    else if (hour < 14) {
      newIndex = 1;
      meal = 'l';
    }
    else {
      newIndex = 2;
      meal = 'd';
    }

    document.getElementById('mealSelect').selectedIndex = newIndex;
    change('', '');
  }

  //called on load and after each filter click
  function change(type, button) {
    var index = -2;

    //update hall/filter/freeFilter
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
    else if (type == 'freeFilter') {
      index = freeFilters.indexOf(button);
      if(index == -1)
        freeFilters.push(button);
      else
        freeFilters.splice(index, 1);
    }

    //update displayedItems
    //to be displayed, item hall must match one of halls selected (if any)
    //must match all of filters and none of freeFilters
    displayedItems = [];
    for (i = 0; i < items.length; i++) {
      item = items[i];
      var addItem = true;

      //check for meal of day and hall match
      if (meal == item['Meal'] ||
        halls.length != 0 && halls.indexOf(item['Hall']) == -1) {

        itemFilters = item['Filters'];

        //check filter matches
        for (j = 0; j < filters.length; j++) {
          if (itemFilters.indexOf(filters[j]) == -1) {
            addItem = false;
            break;
          }
        }

        //check "free" filters matches
        for (k = 0; k < freeFilters.length; k++) {
          if (itemFilters.indexOf(freeFilters[k] == 1)) {
            addItem = false;
            break;
          }
        }
      }
      else { addItem = false; }

      if (addItem == true)
        displayedItems.push(item);
    }
    $scope.displayedItems = displayedItems;
  }

  $scope.downvote = function(item) {
    //console.log('downvote', item['Name']);
    var id = item['Id'];

    if (!(id in votes) || votes[id] == 0) {
      votes[id] = -1;
      downpost(item);
    }
    else if (votes[id] == 1) { //already upvoted
      votes[id] = -1;
      downpost(item);
      downpost(item);
    }
    else { //already downvoted
      votes[id] = 0;
      uppost(item);
    }
    
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

    if (!(id in votes) || votes[id] == 0) {
      votes[id] = 1;
      uppost(item);
    }
    else if (votes[id] == -1) { //already downvoted
      votes[id] = 1;
      uppost(item);
      uppost(item);
    }
    else { //already upvoted
      votes[id] = 0;
      downpost(item);
    }
    
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
