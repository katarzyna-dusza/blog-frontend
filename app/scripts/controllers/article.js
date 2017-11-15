'use strict';

angular.module('blogApp').controller('ArticleCtrl', ['$location', '$log', '$routeParams', '$rootScope', '$scope', 'moment', 'Posts', '_',
  function ($location, $log, $routeParams, $rootScope, $scope, moment, Posts, _) {
    const USER_OBJECT = {"username": "Normal User"};
    const USER_AVATAR = "https://static.pexels.com/photos/348528/pexels-photo-348528.jpeg";

    $scope.activeFilters = [];
    $scope.like = false;

    $scope.toggleLike = function(like) {
      toggleLike(like);

      Posts
        .toggleLike({id: $routeParams.id}, $scope.post.likes)
        .$promise
        .then(() => {
          $scope.like = !$scope.like;
          onLoad();
        })
        ['catch']((err) => {
          $log.error(err);
        });
    };

    $scope.addMyComment = function() {
      addComment();

      Posts
        .addComment({id: $routeParams.id}, $scope.post.comments)
        .$promise
        .then(() => {
          onLoad();
        })
        ['catch']((err) => {
          $log.error(err);
        });
    };

    $scope.goBack = function() {
      $location.url('/');
    };

    let isLikedByMe = function() {
      if (!_.isUndefined($scope.post.likes)) {
        const likes = $scope.post.likes;

        return !_.isEmpty(_.where(likes, USER_OBJECT));
      }

      return false;
    };

    let addLike = function() {
      if (_.isUndefined($scope.post.likes)) {
        return _.extend($scope.post, {likes: [USER_OBJECT]});
      }

      return $scope.post.likes.push(USER_OBJECT);
    };

    let removeLike = function() {
      const index = _.indexOf($scope.post.likes, USER_OBJECT);

      $scope.post.likes.splice(index, 1);
    };

    let toggleLike = function(like) {
      if (like) {
        return removeLike();
      }

      return addLike();
    };

    let addComment = function() {
      const comment = {
        avatar: USER_AVATAR,
        username: $scope.userName,
        text: $scope.comment
      };

      if (_.isUndefined($scope.post.comments)) {
        return _.extend($scope.post, {comments: [comment]});
      }

      return $scope.post.comments.push(comment);
    };

    let getPostById = function(id) {
      Posts
        .getPostById({id: id})
        .$promise
        .then((post) => {
          $scope.post = post;
          $scope.like = isLikedByMe();
        })
        ['catch']((err) => {
          $log.error(err);
        });
    };

    let onLoad = function() {
      const articleId = $routeParams.id;
      getPostById(articleId);
    };

    onLoad();
  }
]);
