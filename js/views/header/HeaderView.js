define([
    'jquery',
    'parse',
    'underscore',
    'text!templates/dashboard/header/headerTemplate.html'
], function($,  P , _ , headerTemplate){

    var HeaderView = Parse.View.extend({
        el: $(".header"),

        initialize: function() {
         var that = this;
         this.render();

        },

        render: function(){
             var data = {};
            var compiledTemplate = _.template( headerTemplate, data );
            this.$el.html(compiledTemplate);
        }

    });

    return HeaderView;

});
