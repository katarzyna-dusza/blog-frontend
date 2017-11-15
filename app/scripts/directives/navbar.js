'use strict';

angular.module('blogApp').directive('navbar', function () {
  let navbarCtrl = function ($location, $log, $rootScope, $routeParams, $scope, $window, moment, Posts, Categories, Tags, _) {
    const POST_ID = $routeParams.id;

    $scope.activeFilters = [];
    $scope.post = {};

    $scope.goBack = function() {
      $scope.filters = false;
      $scope.article = false;

      $location.url('/');
    };

    $scope.filterByText = function(text) {
      Posts
        .getPostsByText({text: text})
        .$promise
        .then((posts) => {
          $rootScope.$emit('filteredPosts', posts);
        })
        ['catch']((err) => {
          $log.error(err);
        });
    };

    $scope.toggleFilterPosts = function() {
      $scope.filters = !$scope.filters;

      getAllCategories();
      getAllTags();
    };

    $scope.filterPosts = function(filter) {
      manageSelectedFilters(filter);
      filter.selected = !filter.selected;

      const tags = _.pluck(_.where($scope.activeFilters, {type: 'tag'}), 'name').toString();
      const categories = _.pluck(_.where($scope.activeFilters, {type: 'category'}), 'name').toString();

      Posts
        .filterPostsByTagsAndCategories({
          'tags': tags,
          'categories': categories
        })
        .$promise
        .then((posts) => {
          $rootScope.$emit('filteredPosts', posts);
        })
        ['catch']((err) => {
          $log.error(err);
        });
    };

    $scope.goToGithub = function() {
      $window.location.href = "https://katarzyna-dusza.github.io";
    };

    $scope.displayNumber = function(data) {
      if (_.isUndefined(data)) {
        return 0;
      }

      return data.length;
    };

    let decorateTagAndCategory = function(elements, flag) {
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

    let getAllTags = function() {
      Tags
        .query()
        .$promise
        .then((tags) => {
          $scope.tags = decorateTagAndCategory(tags, 'tags');
        })
        ['catch']((err) => {
          $log.error(err);
        });
    };

    let getAllCategories = function() {
      Categories
        .query()
        .$promise
        .then((categories) => {
          $scope.categories = decorateTagAndCategory(categories, 'categories');
        })
        ['catch']((err) => {
          $log.error(err);
        });
    };

    let manageSelectedFilters = function(filter) {
      let index = -1;

      if (filter.selected) {
        index = _.indexOf($scope.activeFilters, filter);

        return $scope.activeFilters.splice(index, 1);
      }

      return $scope.activeFilters.push(filter);
    };

    let showArrow = function() {
      if ('article' === $scope.place) {
        setTimeout(function(){
          $scope.showArrow = true;
        }, 2000);
      }
    };

    let getCurrentPlace = function() {
      showArrow();

      return ('article' === $scope.place);
    };

    let getPostData = function(id) {
      Posts
        .getPostById({id: id})
        .$promise
        .then((post) => {
          $scope.post = post;
        })
        ['catch']((err) => {
          $log.error(err);
        });
    };

    let onLoad = function() {
      $scope.filters = false;
      $scope.article = false;
      $scope.showArrow = false;
      $scope.article = getCurrentPlace();

      if ($scope.article) {
        getPostData(POST_ID);
      }
    };

    onLoad();
  };

  return {
    restrict: 'E',
    scope: {
      place: '@'
    },
    templateUrl: 'views/navbar.html',
    controller: navbarCtrl
  }
});
