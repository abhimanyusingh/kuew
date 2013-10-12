/*
    Author: Abhimanyu Singh <er.abhimanyu@gmail.com>
    Filename: main.js
 */

requirejs.config({
    paths: {
        jquery: 'libs/jquery/jquery-min',

        parse: 'libs/parse/parse.min',
        underscore: 'libs/underscore/underscore-min',
        templates: '../templates',
        raphael : 'libs/raphael/raphael',
        livicons : 'libs/livicons/livicons'
    }

});

requirejs(['parse'], function () {
    // Pass in our Router module and call it's initialize function
    Parse.initialize("zUNltvbSGI2Jh1j8hJwD9acWtdbxAA5XzmmS95w7", "Tp83XbAPCCFHnse06AwJ7hBekJXagRGNYVmuBJPz");
});


require([
    // Load our app module and pass it to our definition function
    'app',

], function(App){
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    App.initialize();
});
