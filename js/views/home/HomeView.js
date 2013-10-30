define([
    'jquery',
    'parse',
    'underscore',
], function($,  P , _ , kuewUser){

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
            var self = this;

            var user = new Parse.User();
            user.set("firstname", this.$("#FirstName").val());
            user.set("lastname", this.$("#LastName").val());
            user.set("email", this.$("#Email").val());
            user.set("username", this.$("#UserName").val());
            user.set("phone", this.$("#PhoneNo").val());
            user.set("password", this.$("#Password").val());
            user.setACL(new Parse.ACL());

            user.signUp(null, {
                success: function(user) {
                    window.location.replace('#dashboard');
                    self.undelegateEvents();
                    delete self;
                },

                error: function(user, error) {
                    self.$("#SignUpErrorr").html(error.message).show();
                }
            });

            this.$("#SignUpError").attr("disabled", "disabled");
            return false;
        },

        resetPassword : function() {
            var self = this;
            var verificationEmail = $("#VerificationEmail").val();
            Parse.User.requestPasswordReset(verificationEmail, {
                success: function() {
                    self.$("#SuccessMsg").html("Password reset request was sent successfully").show();

                },
                error: function(error) {
                    self.$("#ErorrMsg").html(error.message).show();
                }
            });

            return false;

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
            var username = $("#username").val();
            var password =  $("#password").val();
            var userObj = {'username': username, 'password' : password};
           /* Parse.Cloud.run('SignIn', userObj, {
                success: function(user) {
                    console.log(user);
                    Parse.User =  user;
                    window.location.replace('#dashboard');
                },
                error: function(user, error) {
                    $("#signInerror").html("Invalid username or password. Please try again.").show();
                }
            });*/

            Parse.User.logIn( username, password, {
                success: function(user) {
                    window.location.replace('#dashboard');
                },
                error: function(user, error) {
                    $("#ErorrMsg").html("Invalid username or password. Please try again.").show();
                }
            });

        }
    });

    return HomeView;

});
