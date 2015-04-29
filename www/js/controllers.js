angular.module('starter.controllers', ['ionic'])

.controller('PlaylistsCtrl', function($scope, $http) {
  var items = [];
  var displayedItems = [];
  var halls = []; //roma, wucox, whitman, forbes, grad, cjl
  var filters = []; //vgt, vgn
  var porkfree = false;

  $http.get('http://sniksnak.herokuapp.com/api/get/').then(function(resp) {
    console.log('Success', resp);
    // For JSON responses, resp.data contains the result
    items = resp.data;
    change('', '');
  }, function(err) {
    console.error('ERR', err, err.status);
    // err.status will contain the status code
  });

  //click event listeners for filter button
  document.getElementById ('forbes').addEventListener ('click',
    function() {change('hall', 'Forbes');}, false);
  document.getElementById ('wucox').addEventListener ('click',
    function() {change('hall', 'Wu/Wilcox');}, false);
  document.getElementById ('roma').addEventListener ('click',
    function() {change('hall', 'Rocky/Mathey');}, false);
  document.getElementById ('whitman').addEventListener ('click',
    function() {change('hall', 'Whitman');}, false);
  document.getElementById ('cjl').addEventListener ('click', 
    function() {change('hall', 'CJL');}, false);
  document.getElementById ('grad').addEventListener ('click', 
    function() {change('hall', 'Grad');}, false);

  document.getElementById ('vgt').addEventListener ('click', 
    function() {change('filter', 'Vegetarian');}, false);
  document.getElementById ('vgn').addEventListener ('click', 
    function() {change('filter', 'Vegan');}, false);
  
  document.getElementById ('porkfree').addEventListener ('click', 
    function() {
      porkfree = !porkfree;
      change('', '');}, false);

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
      itemFilters = item['Filters'];
      for (j = 0; j < filters.length; j++) {
        if (itemFilters.indexOf(filters[j]) == -1) {
          addItem = false;
          break;
        }
      }
      if (porkfree && itemFilters.indexOf('Pork') != -1)
        addItem = false;
      if (halls.length != 0 && halls.indexOf(item['Hall']) == -1)
        addItem = false;
      if (addItem == true)
        displayedItems.push(item);
    }
    $scope.displayedItems = displayedItems;
  }

  $scope.downvote = function(item) {
    console.log('downvote', item['Name']);
    item['Votes']--;
    $scope.displayedItems = displayedItems;
  }

  $scope.upvote = function(item) {
    console.log('upvote', item['Name']);
    item['Votes']++;
    $scope.displayedItems = displayedItems;
  }
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
