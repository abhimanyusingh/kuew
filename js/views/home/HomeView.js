define([
    'jquery',
    'parse',
    'underscore',
    'Models/user'
], function($,  P , _ , kuewUser){

    var HomeView = Parse.View.extend({

        initialize: function() {
            var that = this;
            this.render();

        },

        render: function(){
            var user = new kuewUser();
            var userObj = {
                'title' : 'Mr',
                'firstname' : "Abhimanyu",
                'lastname' : "Singh",
                'email' : 'abhimanyu05@gmail.com',
                'username' : 'abhimanyusingh',
                'phone' : '9739357806',
                'password' :  'colvin',
                'role' :   'KuewMasterRole'
            };
            user.createUser(userObj,

                function(user){
                    alert("success");
                    console.log(user);
                 },

                 function(user, error) {
                    alert("error");
                     console.log(error);
                }
            )
        }

    });

    return HomeView;

});
