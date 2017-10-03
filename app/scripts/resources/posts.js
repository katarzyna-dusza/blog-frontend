'use strict';

angular.module('blogApp').service('Posts', ['$http', '$resource', 'Config',
  function ($http, $resource, Config) {
    return $resource(
      Config.apiUrl,
      {},
      {
        query: {
          method: 'GET',
          isArray: true,
          url: Config.apiUrl + '/posts'
        },
        getPostById: {
          method: 'GET',
          isArray: false,
          url: Config.apiUrl + '/posts/:id',
          params: {
            id: '@id'
          }
        },
        getPostsByCategories: {
          method: 'GET',
          isArray: true,
          url: Config.apiUrl + '/posts?categories=:categories',
          params: {
            categories: '@categories'
          }
        },
        getPostsByText: {
          method: 'GET',
          isArray: true,
          url: Config.apiUrl + '/posts?text=:text',
          params: {
            text: '@text'
          }
        },
        getPostsByTags: {
          method: 'GET',
          isArray: true,
          url: Config.apiUrl + '/posts?tags=:tags',
          params: {
            tags: '@tags'
          }
        },
        getMyFavouritePosts: {
          method: 'GET',
          isArray: true,
          url: Config.apiUrl + '/posts?userName=:userName',
          params: {
            userName: '@userName'
          }
        },
        getAllCategories: {
          method: 'GET',
          isArray: true,
          url: Config.apiUrl + '/categories'
        },
        getAllTags: {
          method: 'GET',
          isArray: true,
          url: Config.apiUrl + '/tags'
        },
        filterPostsByTagsAndCategories: {
          method: 'GET',
          isArray: true,
          url: Config.apiUrl + '/posts?tags=:tags&categories=:categories',
          params: {
            'tags': '@tags',
            'categories': '@categories'
          }
        }
      }
    );
  }
]);
