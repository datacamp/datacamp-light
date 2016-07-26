(function() {
  'use strict';

  angular.module('dataCampLight').config(['$httpProvider', 'growlProvider', function($httpProvider, growlProvider) {
    // Configure $http
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.defaults.withCredentials = true;

    // Configurate Growl Notifications
    growlProvider.globalPosition('bottom-left');
    growlProvider.globalDisableIcons(true);
    growlProvider.globalDisableCountDown(true);
    //growlProvider.globalTimeToLive(5000);
    //growlProvider.onlyUniqueMessages(false);
    growlProvider.globalReversedOrder(true);
  }]);

})();
