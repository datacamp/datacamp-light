'use strict';

angular.module('dataCampLight.services').factory('RenderService', ['$rootElement', function ($rootElement) {
  return {
    getElement: getElement,
    calculateRenderDimensions: calculateRenderDimensions
  };

  function getElement() {
    return $rootElement.find('.dcl-content--tab-body:first')
  }

  function calculateRenderDimensions() {
    var container = getElement();
    return {
      'height': Math.round(container.height()) - 25,
      'width': Math.round(container.width()) - 5
    };
  }
}]);
