'use strict';

angular.module('blogApp').service('Config', function () {
   var API_HOST = "http://localhost";
   var API_PORT = 3000;

   var apiHost = function() {
     return API_HOST;
   };

   var apiPort = function() {
     return API_PORT;
   };

   var apiUrl = function() {
     return API_HOST + ":" + API_PORT;
   };

  return {
    apiHost: apiHost,
    apiPort: apiPort,
    apiUrl: apiUrl
  };
});
