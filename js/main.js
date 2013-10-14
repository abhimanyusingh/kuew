/*
    Author: Abhimanyu Singh <er.abhimanyu@gmail.com>
    Filename: main.js
 */

require.config({
    paths: {
        jquery: 'libs/jquery/jquery-min',
        parse: 'libs/parse/parse.min',
        underscore: 'libs/underscore/underscore-min',
        templates: '../templates',
        raphael : 'libs/raphael/raphael',
        livicons : 'libs/livicons/livicons'
    }
});

require([
    // Load our app module and pass it to our definition function
    'app',

], function(App){
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    App.initialize();
});
