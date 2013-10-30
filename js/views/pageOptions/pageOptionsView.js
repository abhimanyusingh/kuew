define([
    'jquery',
    'underscore',
    'parse',
    'text!templates/pageOptions/pageOptionsTemplate.html'
], function($, _, P , pageOptionsTemplate){

    var pageOptionsView = Parse.View.extend({




        el: "#page_options_slider",

        events: {
            "click .page_options_toggler": "pageOptions",
            //"click #add_new_elements" : "pageOptionsTooldBar",
            "click .menu_wrapper .menu_option": "menuOptions"
        },

        initialize: function() {
            var that = this;
            this.render();


        },

        render: function(){
            var data = {};
            var self = this;
            var compiledTemplate = _.template( pageOptionsTemplate, data );
            this.$el.find("#page_options_slider_wrapper").append(compiledTemplate);
            this.delegateEvents();
        },

        pageOptions : function() {
            this.$('#page_options_toolbar').toggle();
            var is_slider_opened = this.$('#page_options_slider_wrapper').hasClass('open_slider');
            if (!is_slider_opened)
            {
                this.$('.page_options_toggler').addClass('hovered');
            }
        },

        pageOptionsTooldBar : function() {
            this.$('#page_options_toolbar').hide();
            this.$('.elements_options_toolbar').show();
        },

        menuOptions : function(){
            alert("menuOptions");
        }
    });

    return pageOptionsView;

});
