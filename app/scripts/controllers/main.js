'use strict';

angular.module('blogApp').controller('MainCtrl', ['$location', '$log', '$scope', 'Posts',
  function ($location, $log, $scope, Posts) {
    var USER = "NormalUser";
    $scope.search = false;
    $scope.filters = false;
    $scope.sign = false;
    $scope.activeFilters = [];
    $scope.testH = false;

    $scope.readMore = function(id) {
      $location.url('/article/' + id);
    };

    var getAllPosts = function() {
      Posts
        .query()
        .$promise
        .then(function(posts) {
          $scope.posts = posts;
        })
        ['catch'](function (err) {
          $log.error(err);
        });
    };

    var getFavouritePosts = function(username) {
      Posts
        .getMyFavouritePosts({userName: username})
        .$promise
        .then(function(posts) {
          $scope.favouritePosts = posts;
        })
        ['catch'](function (err) {
          $log.error(err);
        });
    };

    var onLoad = function() {
      getAllPosts();
      getFavouritePosts(USER);
    };

    onLoad();
  }
]);
