'use strict';

/**
 * Set the url for all API calls.
 */
angular.module('dataCampLight.services').factory('url', function(){
  return {
    sessionManager: 'https://multiplexer-prod.datacamp.com/'
  };
});
