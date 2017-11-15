'use strict';

angular.module('blogApp').service('Tags', ['$http', '$resource', 'Config', function ($http, $resource, Config) {
  return $resource(
    Config.apiUrl,
    {},
    {
      query: {
        method: 'GET',
        isArray: true,
        url: Config.apiUrl + '/tags'
      }
    }
  );
}]);
