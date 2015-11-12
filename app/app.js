'use strict';

angular.module('myApp', ['ui.router'])

.config(function($stateProvider, $httpProvider){
    $stateProvider.state('main',{
      url:'/',
      templateUrl:'partials/main.html',
      controller:'mainController'
    })
    .state('main.about', {
      url:'about',
      templateUrl:'partials/about.html',
      controller:'aboutController'
    })
    .state('main.contact', {
      url:'contact',
      templateUrl:'partials/contact.html',
      controller:'contactController'
    })
    .state('projects', {
      url:'/projects',
      templateUrl:'partials/projects.html',
      controller:'projectsController'
    })
    .state('resume', {
      url:'/resume',
      templateUrl:'partials/resume.html',
      controller:'resumeController'
    })
 }).run(function($state){
   $state.go('main');
 })

.controller('mainController', ['$scope', '$rootScope', '$window', '$state', function($scope,$rootScope,$window,$state) {
  var basics = 0;
  $(window).resize(function(){

    $scope.$apply(function(){
       //do something to update current scope based on the new innerWidth and let angular update the view.
      //  setLayout(basics, $(window).width(), $(window).height())
    });
  });
  // setLayout(basics, $(window).width(), $(window).height())

  $scope.jun = function() {
    $state.go('main', {}, {reload:true});
  };
  // $scope.about = selectSection(basics, $state, "about");
  // $scope.contact = selectSection(basics, $state, "contact");
  // $scope.games = selectSection(basics, $state, "games");
  // $scope.projects = selectSection(basics, $state, "projects");

  controlVideo();
  expandMenu();
  console.log("main executed!");

}])
.controller('aboutController', ['$scope', '$interval', '$timeout', function($scope, $interval,$timeout) {
  var sentences = $("p");
  var size = sentences.length;
  var baseDuration = 250;
  // var getLineHeight = function(i) {return parseInt(sentences.eq(i).css("line-height").slice(0, -2)) + parseInt(sentences.eq(i).css("margin-bottom").slice(0, -2))}
  var height =  sentences.eq(0).outerHeight(true) * (size-1) + sentences.eq(2).outerHeight(true) + $(".blanket").css("padding").slice(0, -2) * 2 + $(".link").css("padding").slice(0, -2) * 2;
  $scope.roles = [false, false, false];

  $("#aboutSection")
  // .velocity({opacity: 1}, 500)
  .velocity({height: height}, {duration : baseDuration * size, easing: [0,0,0,1]})
  ;
  for (var i = 0; i < size-1; i++) {
    sentences.eq(i).velocity("fadeIn", {duration: baseDuration, delay: i * baseDuration});
    // hard coded
  }
  sentences.eq((size-1)).velocity({opacity: 1}, {display: "inline-block", duration: baseDuration, delay: (size-1) * baseDuration });

  $timeout(function() {
    $scope.roles = [true, false, false];
    $interval(function() {
      $scope.roles = $scope.roles.slice(2,3).concat($scope.roles.slice(0,2));
    }, baseDuration * 10)

    $scope.$watch(function() { return $scope.roles; }, function(newValue, oldValue) {
      for (var i = 0; i < 3; i++) {
        if ($scope.roles[i] === true) {
          $(".aboutRole").eq(i).velocity({opacity: 1}, {duration: baseDuration, easing: "easeIn"})
                                .velocity({opacity: 0}, {duration: baseDuration, easing: "easeOut", delay: baseDuration * 8});
          // $(".aboutRole").eq(i).velocity("slideDown", {duration: 1000});
        }
      }
    })
  }, baseDuration * 4);
}])
.controller('resumeController', ['$scope', function($scope) {
  var config = {
        easing: 'ease-in',
        reset:  true,
        delay:  'onload',
        move:     '30px',
        vFactor: 0.90
      }
  $(window).sr = new scrollReveal(config);
}])
.controller('projectsController', ['$scope', '$state', '$timeout', function($scope,$state,$timeout) {
  var grid = $('.grid').masonry({
    // options
    itemSelector: '.grid-item',
  // use element for option
    columnWidth: '.grid-sizer',
    percentPosition: true
  });

  grid.imagesLoaded().progress( function() {
  grid.masonry('layout');
});
}])
.controller('contactController', ['$scope', '$interval', '$timeout', function($scope, $interval,$timeout) {
  var height = $("#contactSection").outerHeight(true);
  $("#contactSection")
  .css({"height": 0})
  // .velocity({opacity: 1}, 500)
  .velocity({height: height}, {duration : 500, easing: [0,0,0,1]});
}]);
