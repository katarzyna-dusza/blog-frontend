'use strict';

angular.module('blogApp').controller('ArticleCtrl', ['$location', '$log', '$routeParams', '$rootScope', '$scope', 'moment', 'Posts', '_',
  function ($location, $log, $routeParams, $rootScope, $scope, moment, Posts, _) {
    var USER_OBJECT = {"username": "Normal User"};
    var USER_AVATAR = "https://static.pexels.com/photos/348528/pexels-photo-348528.jpeg";

    $scope.activeFilters = [];
    $scope.like = false;

    $scope.toggleLike = function(like) {
      toggleLike(like);

      Posts
        .toggleLike({id: $routeParams.id}, $scope.post.likes)
        .$promise
        .then(function() {
          $scope.like = !$scope.like;
          onLoad();
        })
        ['catch'](function (err) {
          $log.error(err);
        });
    };

    $scope.addMyComment = function() {
      addComment();

      Posts
        .addComment({id: $routeParams.id}, $scope.post.comments)
        .$promise
        .then(function() {
          onLoad();
        })
        ['catch'](function (err) {
          $log.error(err);
        });
    };

    $scope.goBack = function() {
      $location.url('/');
    };

    var likedByMe = function() {
      if (!_.isUndefined($scope.post.likes)) {
        var likes = $scope.post.likes;

        return !_.isEmpty(_.where(likes, USER_OBJECT));
      }

      return false;
    };

    var addLike = function() {
      if (_.isUndefined($scope.post.likes)) {
        return _.extend($scope.post, {likes: [USER_OBJECT]});
      }

      return $scope.post.likes.push(USER_OBJECT);
    };

    var removeLike = function() {
      var index = _.indexOf($scope.post.likes, USER_OBJECT);

      $scope.post.likes.splice(index, 1);
    };

    var toggleLike = function(like) {
      if (like) {
        return removeLike();
      }

      return addLike();
    };

    var addComment = function() {
      var comment = {
        avatar: USER_AVATAR,
        username: $scope.userName,
        text: $scope.comment
      };

      if (_.isUndefined($scope.post.comments)) {
        return _.extend($scope.post, {comments: [comment]});
      }

      return $scope.post.comments.push(comment);
    };

    var getPostById = function(id) {
      Posts
        .getPostById({id: id})
        .$promise
        .then(function(post) {
          $scope.post = post;
          $scope.like = likedByMe();
        })
        ['catch'](function (err) {
          $log.error(err);
        });
    };

    var onLoad = function() {
      var articleId = $routeParams.id;
      $rootScope.$emit('readArticle');
      getPostById(articleId);
    };

    onLoad();
  }
]);
