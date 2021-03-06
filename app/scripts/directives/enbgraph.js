'use strict';

/**
 * @ngdoc directive
 * @name driveoutApp.directive:enbgraph
 * @description
 * # enbgraph
 */
angular.module('driveoutApp')
  .directive('enbgraph', function () {
    return {
      restrict: 'EA',
      scope: {
        gexf: '=',
        csv: '=',
        height: '='
      },
      link: function postLink(scope, element, attrs) {
        element.css('heigth', '100%');

        var enb = new ENBGraph(element[0]);

        // Loading graph
        enb.load(scope.gexf, scope.csv, function() {
          console.log('Graph loaded.');
          // Binding clicks
        });

        scope.$on('focus', function(e, string) {
          var group = string.split(',');

          if (group.length < 2) {

            // Focusing on a single node
            enb.focusOnNodeByLabel(group[0]);
          }
          else {

            // Focusing on a group of nodes
            enb.focusOnGroupByLabels(group);
          }
        });
      }
    };
  });
