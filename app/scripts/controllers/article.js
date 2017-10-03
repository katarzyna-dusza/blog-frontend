'use strict';

angular.module('blogApp').controller('ArticleCtrl', ['$location', '$log', '$routeParams', '$scope', '$window', 'moment', 'Posts', '_', function ($location, $log, $routeParams, $scope, $window, moment, Posts, _) {
  $scope.search = false;
  $scope.filters = true;
  $scope.sign = false;
  $scope.activeFilters = [];
  $scope.testH = false;

  $scope.goBack = function() {
    $scope.filters = !$scope.filters;
    $location.url('/');
  };

  var decorateTagAndCategory = function(elements, flag) {
    if ('categories' === flag) {
      return _.map(elements, function(elem) {
        return {
          name: elem, type: 'category', selected: false
        }
      });
    }

    return _.map(elements, function(elem) {
      return {
        name: elem, type: 'tag', selected: false
      }
    });
  };

  var getPostById = function(id) {
    Posts
      .getPostById({id: id})
      .$promise
      .then(function(post) {
        $scope.post = post;
      })
      ['catch'](function (err) {
      $log.error(err);
    });
  };

  var getAllTags = function() {
    Posts
      .getAllTags()
      .$promise
      .then(function(tags) {
        $scope.tags = decorateTagAndCategory(tags, 'tags');
      })
      ['catch'](function (err) {
      $log.error(err);
    });
  };

  var getAllCategories = function() {
    Posts
      .getAllCategories()
      .$promise
      .then(function(categories) {
        $scope.categories = decorateTagAndCategory(categories, 'categories');
      })
      ['catch'](function (err) {
      $log.error(err);
    });
  };

  var onLoad = function() {
    var articleId = $routeParams.id;
    getPostById(articleId);
  };

  $scope.goBack = function() {
    $scope.search = false;
    $scope.filters = false;
    $scope.sign = false;
  };

  $scope.openSearch = function() {
    $scope.filters = false;
    $scope.sign = false;
    $scope.search = true;
  };

  $scope.closeSearch = function() {
    $scope.search = false;
  };

  $scope.filterByText = function(text) {
    Posts
      .getPostsByText({text: text})
      .$promise
      .then(function(posts) {
        $scope.posts = posts;
      })
      ['catch'](function (err) {
      $log.error(err);
    });
  };

  $scope.toggleFilterPosts = function() {
    $scope.sign = false;
    $scope.search = false;
    $scope.filters = !$scope.filters;

    getAllCategories();
    getAllTags();
  };

  $scope.filterPosts = function(filter) {
    filter.selected = !filter.selected;
    $scope.activeFilters.push(filter);
    var tags = _.pluck(_.where($scope.activeFilters, {type: 'tag'}), 'name').toString();
    var categories = _.pluck(_.where($scope.activeFilters, {type: 'category'}), 'name').toString();

    Posts
      .filterPostsByTagsAndCategories({
        'tags': tags,
        'categories': categories
      })
      .$promise
      .then(function(posts) {
        $scope.posts = posts;
      })
      ['catch'](function (err) {
      $log.error(err);
    });
  };

  $scope.goToGithub = function() {
    $window.location.href = "https://katarzyna-dusza.github.io";
  };

  onLoad();
}]);
