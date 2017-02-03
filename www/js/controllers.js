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

.controller('LocationCtrl', function($scope, $stateParams, $http, tacoTruckApiUrl) {
  console.log('things and stuff');
  $scope.location = 'some location';
  $scope.id = $stateParams.id;
  $scope.listCanSwipe = true;

  $scope.getAllLocations = function() {
    console.log('getting location information from ' + tacoTruckApiUrl);
    $http({
      method: 'GET',
      url: tacoTruckApiUrl + '/locations'
    })
      .then(function(response) {
        $scope.locations = response.data;
        $scope.locations.forEach(function(location){
          location.all_images.forEach(function(image){
            if(image.location_banner === 1) {
              location.thumbnail = image.cloudinary_id;
            }
          })
        })
      })

  };
  $scope.getAllLocations();
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
