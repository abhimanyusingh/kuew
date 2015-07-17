define([
    'jquery',
    'underscore',
    'parse',
    'text!templates/dashboard/dashboard.html'
], function($, _, P , dashboardTemplate){

    var dashboardView = Parse.View.extend({
        el: $("#pjax-container"),

        initialize: function() {
            var that = this;
            this.render();

        },

        render: function(){
            var data = {};
            var compiledTemplate = _.template( dashboardTemplate, data );
            this.$el.html(compiledTemplate);
        }
    });

    return dashboardView;

});
