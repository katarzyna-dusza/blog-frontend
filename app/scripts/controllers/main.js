'use strict';

angular.module('blogApp').controller('MainCtrl', ['$location', '$log', '$rootScope', '$scope', 'Posts',
  function ($location, $log, $rootScope, $scope, Posts) {
    var USER = "Normal User";

    $scope.search = false;
    $scope.filters = false;
    $scope.sign = false;
    $scope.activeFilters = [];

    $rootScope.$on('filteredPosts', function(event, posts) {
      $scope.posts = posts;
    });

    $scope.readMore = function(id) {
      $location.url('/article/' + id);
    };

    $scope.commentedByMe = function(id) {
      if (!_.isUndefined(getPost(id)) && !_.isUndefined(getPost(id).comments)) {
        var comments = getPost(id).comments;

        return !_.isEmpty(_.where(comments, {username: USER}));
      }

      return false;
    };

    $scope.likedByMe = function(id) {
      if (!_.isUndefined(getPost(id)) && !_.isUndefined(getPost(id).likes)) {
        var likes = getPost(id).likes;

        return !_.isEmpty(_.where(likes, {username: USER}));
      }

      return false;
    };

    var getPost = function(id) {
      return _.find($scope.posts, {"_id": id});
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
