'use strict';

angular.module('app.site', [
  'ui.router' 
])

.config(
  [ '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      

      $stateProvider

        .state("create", {
          url: '/new',
          templateUrl: 'views/sites/create.html',
          controller: function($scope, $rootScope, $state, $filter, $http){

            // Get token
            // @todo: move this into service
            /*if ($rootScope.token == undefined) {
              $http({
                url: $rootScope.apiUrl + 'restws/session/token',
                method: 'GET',
                requestType: 'text',
              }).success(function(data) {
                $rootScope.token = data;
                console.log('dad',data);
              });
            }*/

            $scope.name = '';
            $scope.machineName = '';
            $scope.machineFocused = false;
            $scope.machineNameClass = '';
            $scope.profile = 'helmcivic';
            $scope.location = null;

            $scope.getMachineName = function() {
              $scope.machineName = !$scope.machineNameFocused || $scope.machineName == '' ? $scope.name.replace(/[^a-z0-9]/gi, '-').toLowerCase() : $scope.machineName;
              Node.query({
                'type': 'site',
                field_machine_name: $scope.machineName
              }, function(data) {
                if (data.list.length) {
                  $scope.machineNameClass = 'has-error';
                }
                else {
                  $scope.machineNameClass = 'has-success';
                }
              })
            }

            $scope.submit = function(mlid) {
              if ($scope.machineNameClass == 'has-error') {
                alert('Sorry, your machine name is already taken.');
                return;
              }

              //data we need: profile&name&email&title&machine_name&lat&lng
              $scope.activeLink = mlid;
              var data = {
                type: 'site',
                sitename: $scope.name,
                machine_name: $scope.machineName,
                email: $scope.mail,
                name: $scope.mail,
                profile: $scope.profile,
                lat: $scope.location.geometry != undefined ? $scope.location.geometry.location.A : null,
                lng: $scope.location.geometry != undefined ? $scope.location.geometry.location.F : null,
              };
              console.log(data);
              // Save via $resource
              // @todo: make this work (issues with $rootScope.token not being set in service)
              //var site = new Node(data);
              //site.$save();

              console.log($scope);
              return;
              // Save inline
              $http({
                url: $rootScope.siteCreate + 'api/create',
                dataType: 'json',
                method: 'POST',
                data: data,
                headers: { 
                  'X-CSRF-Token': $rootScope.token,
                  'Content-Type': 'application/json'
                }
              }).success(function(data) {
                $state.go('sites');
              });
            }
          }
        })


        .state("thanks", {
          url: '/thanks?email',
          templateUrl: 'views/sites/thanks.html',
          controller: function($scope, $rootScope, $state, $filter, $http){
            $scope.email = $state.params.email;
          }
        })

    }
  ]
)


