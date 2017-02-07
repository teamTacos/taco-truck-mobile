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

.controller('LocationCtrl', function($scope, $stateParams, Locations, $ionicModal) {
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

  $scope.createLocation = function(){
    console.log($scope.location);
    Locations.create($scope.location).success(function(response){
      console.log(response)
    })
  };

  $ionicModal.fromTemplateUrl('/templates/modals/add-location.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
})

.controller('ItemCtrl', function($scope, $stateParams, Items, $ionicModal){
  Items.getByLocationId($stateParams.locationId).success(function(data){
    $scope.items = data;
  });

  $ionicModal.fromTemplateUrl('/templates/modals/add-item.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
})

.controller('ReviewCtrl', function($scope, $stateParams, Reviews, $ionicModal){
  Reviews.getByLocationItemId($stateParams.locationId, $stateParams.itemId).success(function(data){
    $scope.reviews = data;
  });

  $ionicModal.fromTemplateUrl('/templates/modals/add-review.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
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
