define([
    'jquery',
    'parse',
    'underscore',
    'text!templates/header/headerTemplate.html'
], function($,  P , _ , headerTemplate){

    var HeaderView = Parse.View.extend({
        el: $(".header"),

        events: {
            "click .dropdown-toggle" : "showUserMenu",
            "click li a.logout" : "logout"
        },

        showUserMenu : function(evt) {
            evt.preventDefault();
            this.$el.find('ul.dropdown-menu').show();
        },

        logout : function(evt) {
            Parse.User.logOut();
            window.location.replace('/');
        },

        initialize: function() {
         var that = this;
         this.render();

        },

        render: function(){
            var data = {'username': Parse.User.current().get('username')};
            var compiledTemplate = _.template( headerTemplate, data );
            this.$el.html(compiledTemplate);
        }

    });

    return HeaderView;

});
