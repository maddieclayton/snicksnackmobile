angular.module('starter.controllers', [])

// .controller('AppCtrl', function($scope, $ionicModal, $timeout) {
//   // Form data for the login modal
//   $scope.loginData = {};

//   // Create the login modal that we will use later
//   $ionicModal.fromTemplateUrl('templates/login.html', {
//     scope: $scope
//   }).then(function(modal) {
//     $scope.modal = modal;
//   });

//   // Triggered in the login modal to close it
//   $scope.closeLogin = function() {
//     $scope.modal.hide();
//   };

//   // Open the login modal
//   $scope.login = function() {
//     $scope.modal.show();
//   };

//   // Perform the login action when the user submits the login form
//   $scope.doLogin = function() {
//     console.log('Doing login', $scope.loginData);

//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeLogin();
//     }, 1000);
//   };
// })



.controller('PlaylistsCtrl', function($scope) {
  $scope.Forbes = [
    { title: 'Beef and Rice Noodles', id: 1 },
    { title: 'Chicken with Mushrooms and Leeks', id: 2 },
    { title: 'Vegetables and Couscous', id: 3 },
    { title: 'Hummus', id: 4 }
  ];
  $scope.Wu = [
    { title: 'Chicken Tenders', id: 1 },
    { title: 'Corn', id: 2 },
    { title: 'Shoestring Fries', id: 3 },
    { title: 'Chicken Rice Soup', id: 4 }
  ];
  $scope.Popularity = [
    { title: 'Chicken Tenders', id: 1 },
    { title: 'Beef and Rice Noodles', id: 2 },
    { title: 'Moo Sho Pork', id: 3 },
    { title: 'Pasta Marinara', id: 4 }
  ];
  $scope.Rocky = [
    { title: 'Pasta Marinara', id: 1 },
    { title: 'Tortellini Primavera', id: 2 },
    { title: 'Cheese Pizza', id: 3 },
    { title: 'Grilled Cheese Trio', id: 4 }
  ];
  $scope.Whitman = [
    { title: 'Fried Catfish Shooter', id: 1 },
    { title: 'Basil Chicken', id: 2 },
    { title: 'Hot and Sour Soup', id: 3 },
    { title: 'Tofu Vietnamese', id: 4 }
  ];
  $scope.JCL = [
    { title: 'Lemon Pollack', id: 1 },
    { title: 'Black Bean Veggie Couscous', id: 2 },
    { title: 'Baked Sweet Potato', id: 3 },
    { title: 'Sauteed Green Beans', id: 4 }
  ];
  $scope.Grad = [
    { title: 'Moo Sho Pork', id: 1 },
    { title: 'Thai Coconut Soup', id: 2 },
    { title: 'Buffalo Chicken Wings', id: 3 },
    { title: 'Sesame Noodles', id: 4 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
