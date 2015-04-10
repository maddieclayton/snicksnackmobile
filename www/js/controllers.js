angular.module('starter.controllers', [])


.controller('PlaylistsCtrl', function($scope) {
  //var items = JSON.parse(query result);
  var items = [{'name': 'Nuggets', 'filters': ['W'], 'votes': 5},
    {'name': 'Melon', 'filters': ['F'], 'votes': 2}];
  var displayedItems = []
  var filters = []; //F, Wu, R, Wh, J, G
  change('');
  $scope.Popularity = displayedItems;

  function change(filter) {
    if (filter != '') {
    index = filters.indexOf(filter);
    if(index == -1)
      filters.push(filter);
    else
      filters.splice(index, 1);
    }

    displayedItems = [];
    for (i = 0; i < items.length; i++) {
      item = items[i];
      var addItem = true;
      itemFilters = item['filters'];
      for (j = 0; j < filters.length; j++) {
        if (itemFilters.indexOf(filters[j]) == -1) {
          addItem = false;
          break;
        }
      }
      if (addItem == true)
        displayedItems.push(item);
    }
    //state.go($state.current, {}, {reload: true});
  }
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
