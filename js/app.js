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
        Parse.initialize("zUNltvbSGI2Jh1j8hJwD9acWtdbxAA5XzmmS95w7", "Tp83XbAPCCFHnse06AwJ7hBekJXagRGNYVmuBJPz");
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});
