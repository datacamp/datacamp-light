'use strict';

angular.module('dataCampLight.services').factory('RenderService', ['$rootElement', function ($rootElement) {
  return {
    calculateRenderDimensions: calculateRenderDimensions
  };

  function calculateRenderDimensions() {
    var container = $rootElement.find('.dcl-content--tab-body:first');
    return {
      'height': Math.round(container.height()) - 40,
      'width': Math.round(container.width())
    };
  }
}]);
