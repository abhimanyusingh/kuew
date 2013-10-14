
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

], function($, _ , P,  HeaderView, pageOptionsView, AsideView, HomeView) {

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
            var headerView = new pageOptionsView();
            var asideView = new AsideView();
        });

        app_router.on('route:showHome', function(){
           if (Parse.User.current()) {
                window.location.replace('#dashboard');
           } else {
                console.log("in");
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
