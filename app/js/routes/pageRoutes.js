'use strict';

angular.module('app')

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      
      $urlRouterProvider
        //.when('/', '/sites');

      $stateProvider
        
        .state("home", {
          url: '/',
          resolve: {
            links: function($stateParams, MenuLink) {
              return MenuLink.query().$promise.then(function(data) {
                return data.list;
              });
            },
            nodes: function($stateParams, Node) {
              return Node.query().$promise.then(function(data) {
                return data.list;
              });
            }
          },
          templateUrl: 'views/home.html',
          controller: function($scope, $rootScope, $state, $filter, links, nodes){
            $scope.links = links;
            $scope.nodes = nodes;
            $scope.parentLinks = $filter('filter')($scope.links, {plid: '0'}, true);
          }
        })

        .state("home.modal", {
          url: "/modal/:nid",
          onEnter: 
          ['$stateParams', '$state', '$modal', '$resource', 'Node', '$promise', 
          function($stateParams, $state, $modal, $resource, Node, $promise) {
            alert('asdf');
            $modal.open({
              templateUrl: "views/modal.html",
              resolve: {
                node: function($stateParams, Node) {
                  return Node.get($stateParams.nid).$promise.then(function(data) {
                    return data;
                  });
                }
              },
              controller: ['$scope', 'node', function($scope, node) {
                $scope.dismiss = function() {
                  $scope.$dismiss();
                };

                $scope.save = function() {
                  item.update().then(function() {
                    $scope.$close(true);
                  });
                };
              }]
            }).result.finally(function() {
              $state.go('^');
            });
          }]
        })


        .state("mytown", {
          url: '/mytown',
          resolve: {
            node: function($stateParams, Node) {
              return Node.get({nid: 16}).$promise.then(function(data) {
                return data;
              });
            }
          },
          templateUrl: 'views/mytown.html',
          controller: function($scope, $rootScope, $state, $filter, $sce, node){
            $scope.node = node;
            $scope.url = $rootScope.myTownUrl;

            $scope.trustSrc = function(src) {
              return $sce.trustAsResourceUrl(src);
            }

          }
        })


        .state("explore", {
          url: '/explore',
          resolve: {
            node: function($stateParams, Node) {
              return Node.get({nid: 15}).$promise.then(function(data) {
                return data;
              });
            }
          },
          templateUrl: 'views/explore.html',
          controller: function($scope, $rootScope, $state, $filter, $sce, node){
            $scope.node = node;
            $scope.url = $rootScope.exploreUrl;

            $scope.trustSrc = function(src) {
              return $sce.trustAsResourceUrl(src);
            }

          }
        })


    }
  ]
)
