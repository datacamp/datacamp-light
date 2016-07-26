'use strict';

angular.module('dataCampLight.services').factory('RenderService', ['$rootElement', function ($rootElement) {
  return {
    calculateRenderDimensions: calculateRenderDimensions
  };

  function calculateRenderDimensions() {
    var container = $rootElement.find('.dcl-content--tab-body:first');
    return {
      'height': Math.round(container.height()) - 25,
      'width': Math.round(container.width()) - 5
    };
  }
}]);
