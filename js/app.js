/*
 Author: Abhimanyu Singh <er.abhimanyu@gmail.com>
 Filename: main.js
 */

define([
    'jquery',
    'underscore',
    'router', // Request router.js
    'raphael',
    'livicons'
], function($, _, Router){
    var initialize = function(){
        // Pass in our Router module and call it's initialize function
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});
