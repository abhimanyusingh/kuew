define([
    'jquery',
    'underscore',
    'parse',
    'text!templates/dashboard/aside/asideTemplate.html'
], function($, _, P , asideTemplate){

    var AsideView = Parse.View.extend({
        el: $("#nav"),

        initialize: function() {
         var that = this;
         this.render();

        },

        render: function(){
             var data = {};
            var compiledTemplate = _.template( asideTemplate, data );
            this.$el.html(compiledTemplate);
        }

    });

    return AsideView;

});
