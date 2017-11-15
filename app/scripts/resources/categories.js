'use strict';

angular.module('blogApp').service('Categories', ['$http', '$resource', 'Config', function ($http, $resource, Config) {
  return $resource(
    Config.apiUrl,
    {},
    {
      query: {
        method: 'GET',
        isArray: true,
        url: Config.apiUrl + '/categories'
      }
    }
  );
}]);
