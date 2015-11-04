'use strict';

angular.module('myApp', ['ui.router'])

.config(function($stateProvider, $httpProvider){
    $stateProvider.state('main',{
      url:'/',
      templateUrl:'partials/main.html',
      controller:'mainController'
    })
    .state('about', {
      url:'/about',
      templateUrl:'partials/about.html',
      controller:'mainController'
    })
    .state('contact', {
      url:'/contact',
      templateUrl:'partials/contact.html',
      controller:'mainController'
    })
    .state('games', {
      url:'/games',
      templateUrl:'partials/games.html',
      controller:'mainController'
    })
    .state('projects', {
      url:'/projects',
      templateUrl:'partials/projects.html',
      controller:'mainController'
    })
    .state('frogger', {
      url:'/frogger',
      templateUrl:'partials/frogger.html',
      controller:'mainController'
    })
 }).run(function($state){
   $state.go('main');
 })

.controller('mainController', ['$scope', '$rootScope', '$window', '$state', function($scope,$rootScope,$window,$state){
  // $("div").velocity({
  //   width: "*=2"
  // }, 2000);
  var barWidth = 200;
  var barHeight = 50;
  var lineWidth = 4;
  var basics = { barWidth: barWidth, barHeight: barHeight, lineLength: 2 * barWidth, lineWidth: lineWidth }
  // console.log(basics);
  $(window).resize(function(){

    $scope.$apply(function(){
       //do something to update current scope based on the new innerWidth and let angular update the view.
       setLayout(basics, $(window).width(), $(window).height())
    });
  });
  setLayout(basics, $(window).width(), $(window).height())

  $scope.about = selectSection(basics, $state, "about");
  $scope.contact = selectSection(basics, $state, "contact");
  $scope.games = selectSection(basics, $state, "games");
  $scope.projects = selectSection(basics, $state, "projects");

}]);
