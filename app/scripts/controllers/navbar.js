'use strict';

angular.module('blogApp').controller('NavbarCtrl', ['$location', '$log', '$rootScope', '$scope', '$window', 'moment', 'Posts', '_', function ($location, $log, $rootScope, $scope, $window, moment, Posts, _) {
  $scope.search = false;
  $scope.filters = false;
  $scope.article = false;
  $scope.activeFilters = [];

  $rootScope.$on('readArticle', function() {
    $scope.article = !$scope.article;
  });

  $scope.goBack = function() {
    $scope.search = false;
    $scope.filters = false;
    $scope.article = false;

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

  var manageSelectedFilters = function(filter) {
    var index = -1;

    if (filter.selected) {
      index = _.indexOf($scope.activeFilters, filter);
      return $scope.activeFilters.splice(index, 1);
    }

    $scope.activeFilters.push(filter);
  };

  $scope.openSearch = function() {
    $scope.filters = false;
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
        $rootScope.$emit('filteredPosts', posts);
      })
      ['catch'](function (err) {
        $log.error(err);
      });
  };

  $scope.toggleFilterPosts = function() {
    $scope.search = false;
    $scope.filters = !$scope.filters;

    getAllCategories();
    getAllTags();
  };

  $scope.filterPosts = function(filter) {
    manageSelectedFilters(filter);
    filter.selected = !filter.selected;

    var tags = _.pluck(_.where($scope.activeFilters, {type: 'tag'}), 'name').toString();
    var categories = _.pluck(_.where($scope.activeFilters, {type: 'category'}), 'name').toString();

    Posts
      .filterPostsByTagsAndCategories({
        'tags': tags,
        'categories': categories
      })
      .$promise
      .then(function(posts) {
        $rootScope.$emit('filteredPosts', posts);
      })
      ['catch'](function (err) {
        $log.error(err);
      });
  };

  $scope.goToGithub = function() {
    $window.location.href = "https://katarzyna-dusza.github.io";
  };
}]);
