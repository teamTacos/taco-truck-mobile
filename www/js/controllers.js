angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('LocationCtrl', function($scope, $stateParams, Locations) {
  $scope.location = 'some location';
  $scope.id = $stateParams.id;
  $scope.listCanSwipe = true;

  Locations.getAll().success(function(data){
    $scope.locations = data;
    $scope.locations.forEach(function(location){
      location.all_images.forEach(function(image){
        if(image.location_banner === 1) {
          location.thumbnail = image.cloudinary_id;
        }
      })
    });
  });
})

.controller('ItemCtrl', function($scope, $stateParams, Items){
  console.log($stateParams);
  Items.getByLocationId($stateParams.locationId).success(function(data){
    $scope.items = data;
  })
})

.controller('ReviewCtrl', function($scope, $stateParams, Reviews){
  console.log('got reviews?');
  Reviews.getByLocationItemId($stateParams.locationId, $stateParams.itemId).success(function(data){
    $scope.reviews = data;
  })
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  console.log('things and stuff');
  $scope.settings = {
    enableFriends: true
  };
});
