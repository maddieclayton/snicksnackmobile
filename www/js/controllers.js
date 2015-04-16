angular.module('starter.controllers', [])

.controller('PlaylistsCtrl', function($scope) {
  var ip = '10.8.82.196';
  //var items = JSON.parse(query result);
  var items = [{'Name':'Nuggets', 'Hall':'Wilson', 'Votes':5, 'Id':123, 'Filters':['Vegan']},
    {'Name':'Melon', 'Hall':'Forbes', 'Votes':2, 'Id':234, 'Filters':[]},
    {'Name':'Chicken', 'Hall':'Forbes', 'Votes':2, 'Id':234, 'Filters':[]},
    {'Name':'Beef', 'Hall':'Forbes', 'Votes':2, 'Id':234, 'Filters':[]},
    {'Name':'Pork', 'Hall':'Forbes', 'Votes':2, 'Id':234, 'Filters':[]},
    {'Name':'Lamb', 'Hall':'Forbes', 'Votes':2, 'Id':234, 'Filters':[]},
    {'Name':'Ice Cream', 'Hall':'Forbes', 'Votes':2, 'Id':234, 'Filters':[]},
    {'Name':'Brownie', 'Hall':'Forbes', 'Votes':2, 'Id':234, 'Filters':[]}];
  var displayedItems = [];
  var halls = []; //Forbes, Wilson, Rocky, Whitman, CJL, Grad
  var filters = []; //
  change('', '');
  $scope.displayedItems = displayedItems;

  //click event listeners for filter buttons
  document.getElementById ("forbes").addEventListener ("click", forbesFilter, false);
  document.getElementById ("wilson").addEventListener ("click", wilsonFilter, false);
  document.getElementById ("rocky").addEventListener ("click", rockyFilter, false);
  document.getElementById ("whitman").addEventListener ("click", whitmanFilter, false);
  document.getElementById ("cjl").addEventListener ("click", cjlFilter, false);
  document.getElementById ("grad").addEventListener ("click", gradFilter, false);

  //functions called by listeners
  function forbesFilter() { change('hall', 'Forbes'); }
  function wilsonFilter() { change('hall', 'Wilson'); }
  function rockyFilter() { change('hall', 'Rocky'); }
  function whitmanFilter() { change('hall', 'Whitman'); }
  function cjlFilter() { change('hall', 'CJL'); }
  function gradFilter() { change('hall', 'Grad'); }

  //called on load and after each filter click
  function change(type, button) {
    //console.log('change ' + button); //testing
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
      if (halls.length != 0 && halls.indexOf(item['Hall']) == -1)
        addItem = false;
      if (addItem == true)
        displayedItems.push(item);
    }
    /* print for debugging
    console.log(halls.length);
    console.log(filters.length);
    console.log(displayedItems.length); */
    $scope.displayedItems = displayedItems;
  }
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
