'use strict';

angular.module('blogApp').controller('MainCtrl', ['$location', '$log', '$rootScope', '$scope', 'Posts',
  function ($location, $log, $rootScope, $scope, Posts) {
    const USER = "Normal User";

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
        const comments = getPost(id).comments;

        return !_.isEmpty(_.where(comments, {username: USER}));
      }

      return false;
    };

    $scope.likedByMe = function(id) {
      if (!_.isUndefined(getPost(id)) && !_.isUndefined(getPost(id).likes)) {
        const likes = getPost(id).likes;

        return !_.isEmpty(_.where(likes, {username: USER}));
      }

      return false;
    };

    let getPost = function(id) {
      return _.find($scope.posts, {"_id": id});
    };

    let getAllPosts = function() {
      Posts
        .query()
        .$promise
        .then((posts) => {
          $scope.posts = posts;
        })
        ['catch']((err) => {
          $log.error(err);
        });
    };

    let getFavouritePosts = function(username) {
      Posts
        .getMyFavouritePosts({userName: username})
        .$promise
        .then((posts) => {
          $scope.favouritePosts = posts;
        })
        ['catch']((err) => {
          $log.error(err);
        });
    };

    let onLoad = function() {
      getAllPosts();
      getFavouritePosts(USER);
    };

    onLoad();
  }
]);
