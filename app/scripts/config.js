'use strict';

angular.module('blogApp').service('Config', function () {
   var API_HOST = "http://localhost";
   var API_PORT = 3000;

  return {
    apiHost: API_HOST,
    apiPort: API_PORT,
    apiUrl: API_HOST + ":" + API_PORT
  };
});
