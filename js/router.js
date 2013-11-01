
/*
  Author: Abhimanyu Singh <er.abhimanyu@gmail.com>
  Filename: router.js
*/
define([
  'jquery',
  'underscore',
  'parse',
  'views/header/HeaderView',
  'views/pageOptions/pageOptionsView',
  'views/aside/AsideView',
  'views/home/HomeView',
  'views/dashboard/DashboardView'
], function($, _ , P,  HeaderView, PageOptionsView, AsideView, HomeView, DashboardView) {

  var AppRouter = Parse.Router.extend({
    routes: {
      'home' : 'showHome',
      // Define some URL routes
      'dashboard': 'showDashBoard',

      // Default
      '*actions': 'showHome'
    }
  });

  var initialize = function(){


    var app_router = new AppRouter;
    app_router.on('route:showDashBoard', function(){
      $(".home").hide();
      $(".dashboard").show();
      var headerView = new HeaderView();
      var pageOptionsView = new PageOptionsView();
      var asideView = new AsideView();
      var dashboardView = new DashboardView();
    });

    app_router.on('route:showHome', function(){
      if (Parse.User.current()) {
        $(".home").hide();
        window.location.replace('#dashboard');
      } else {
        $(".home").show();
        $(".dashboard").hide();
        var homeView = new HomeView();
      }
    });

    Parse.history.start();
  };
  return {
    initialize: initialize
  };
});
