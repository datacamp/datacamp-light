'use strict';

angular.module('dataCampLight.directives').directive('plotsContainer', ['BackendSessionManager', function (BackendSessionManager) {

  function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, '').replace(/([\da-fA-F]{2}) ?/g, '0x$1 ').replace(/ +$/, '').split(' ')));
  }

  // ------------------------
  // --- Exported Methods ---
  // ------------------------
  return {
    restrict: 'E',
    replace: false,
    templateUrl: 'app/views/partials/plots_container.html',
    link: function (scope, element) {
      var renderDimensions;
      scope.plotIndex = 0;
      scope.plots = [];

      function clearPlotOutput() {
        scope.plotIndex = 0; //reset the plotIndex
        scope.plots.length = 0; //empty the array
        scope.currentImage = null;
      }

      function setCurrentImage() {
        scope.currentImage = scope.plots[scope.plotIndex];
        if (scope.currentImage.resize) {
          scope.currentImage.resize = false;
          BackendSessionManager.resize(renderDimensions, scope.plotIndex);
        }
      }

      /**
       * Show the previous graph
       */
      scope.previousPlot = function () {
        if (scope.plotIndex > 0) {
          scope.plotIndex--;
        }
        setCurrentImage();
      };

      /**
       * Show the next graph
       */
      scope.nextPlot = function () {
        if (scope.plotIndex < (scope.plots.length - 1)) {
          scope.plotIndex++;
        }
        setCurrentImage();
      };

      function createImageSrc(img_url) {
        if (img_url.lastIndexOf("http", 0) === 0) {
          return img_url;
        }
        return 'data:image/png;base64,' + hexToBase64(img_url);
      }

      /**
       * Show a new plot
       * @param _: unused
       * @param image_url (string): the url of the new image that will be shown
       */
      scope.$on('output::plot', function (_, payload) {
        var img_url;
        if (angular.isObject(payload)) {
          img_url = payload.url;
        } else {
          // Fallback
          img_url = payload;
        }
        scope.plots.push({
          src: createImageSrc(img_url),
          resize: false
        });
        scope.plotIndex = scope.plots.length - 1;
        scope.currentImage = scope.plots[scope.plotIndex];
      });

      scope.$on('plots::resize', function (_, renderDims) {
        renderDimensions = renderDims;
        for (var i = 0; i < scope.plots.length; i++) {
          scope.plots[i].resize = true;
        }
        if (scope.plots.length > 0) {
          scope.plots[scope.plotIndex].resize = false;
          BackendSessionManager.resize(renderDimensions, scope.plotIndex);
        } else {
          BackendSessionManager.resize(renderDimensions);
        }
      });

      scope.$on('plot::resized', function (_, payload) {
        // REPLACE FIGURE
        if (payload.index < scope.plots.length) {
          scope.plots[payload.index].src = createImageSrc(payload.url);
          if (payload.index === scope.plotIndex) {
            scope.currentImage = scope.plots[scope.plotIndex];
          }
        }
      })
    }
  };
}]);
