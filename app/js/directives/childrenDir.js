'use strict';

angular.module('app.children', [
  'drupalService'
])

.directive('children', function factory($window, $browser, $filter, Node) {
  return {
    restrict: 'E',
    template : '<div class="block block-children" ng-class="{loading: \'loading\'}" ng-include="getTemplate();"></div>',
    //templateUrl: '/views/block/features.html',
    scope: {
      parentLink: '=',
      allLinks: '=links',
      allNodes: '=nodes',
      apiUrl: '@'
    },
    link: function($scope, $rootScope, $element, $attrs) {
      $scope.loading = true;

      var getNode = function(nid) {
        return $filter('filter')($scope.allNodes, {nid: nid})[0];
      }

      console.log($scope.parentLink.nid);
      $scope.node = getNode($scope.parentLink.nid);
      $scope.nodes = [];
      var menuLinks = $filter('filter')($scope.allLinks, { plid: $scope.parentLink.mlid });

      angular.forEach(menuLinks, function(item, key) {
        var node = getNode(item.nid);
        $scope.nodes.push(node);
      });

      console.log($scope.nodes);


      $scope.getTemplate = function() {
        var name = $scope.node.field_template != undefined ? $scope.node.field_template : 'features';
        return "/views/block/" + name + ".html";
      }

      $scope.extractPath = function(url) {
        return url.replace($scope.apiUrl, '');
      }

      $scope.go = function(state, params) {
        $scope.$root.$state.go(state, params);
      }

    }
  }
})