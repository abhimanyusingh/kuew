define([
  'jquery',
  'parse',
  'underscore',
  '../../models/User'
], function($,  P , _ , KuewUser){

  var HomeView = Parse.View.extend({

    el : $('.home'),

    initialize: function() {
      var that = this;
      this.render();

    },

    events: {
      "click .kuewLogIn" : "kuewLogin",
      "click #SignUpLink" : "showKuewSignUp",
      "click #CreateUser" : "createKuewUser",
      "click #ForgotPasswordLink" : "showResetPasswordBox",
      "click #ResetPassword" : "resetPassword"
    },

    render: function(){

    },

    createKuewUser : function() {
      user = new KuewUser();
      user.create()
    },

    resetPassword : function() {
      user = new KuewUser();
      user.resetPassword();
    },

    showResetPasswordBox : function() {
      this.$el.find("#LoginBox").hide();
      this.$el.find("#SignUpBox").hide();
      this.$el.find("#ResetPwdBox").show();
    },

    showKuewSignUp : function() {
      this.$el.find("#LoginBox").hide();
      this.$el.find("#SignUpBox").show();
      this.$el.find("#ResetPwdBox").hide();
    },

    showKuewLogin : function() {
      this.$el.find("#LoginBox").show();
      this.$el.find("#SignUpBox").hide();
      this.$el.find("#ResetPwdpBox").hide();
    },


    kuewForgotPassword : function() {
      var self = this;
      var verificationEmail = $("#VerificationEmail").val();
      Parse.User.requestPasswordReset(verificationEmail, {
        success: function() {
          alert("Password reset request was sent successfully");

        },
        error: function(error) {
          self.$(".signup-form .error").html(error.message).show();
        }
      });

      return false;
    },

    kuewLogin : function() {
      user = new KuewUser();
      user.login()
    }
  });

  return HomeView;

});
