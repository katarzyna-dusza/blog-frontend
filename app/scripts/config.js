'use strict';

angular.module('blogApp').service('Config', function() {
   const API_HOST = "http://localhost";
   const API_PORT = 5000;

  return {
    apiHost: API_HOST,
    apiPort: API_PORT,
    apiUrl: API_HOST + ":" + API_PORT
  };
});
