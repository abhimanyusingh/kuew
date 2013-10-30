define([
  'jquery',
  'parse'
], function($, P) {
  return function() {

    this.login = function() {
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
          /*
          // get user assets based on his accountID role
          var accountIdName = user.role;
          var queryAccountIdWithAccountIdName = new Parse.Query(accountId);
          queryAccountIdWithAccountIdName.equalTo("name", accountIdName);
          queryAccountIdWithAccountIdName.find({
            success: function(accountId) {
              var queryAssetsWithAccountId = new Parse.query(assets);
              queryAssetsWithAccountId.equalTo("role", accountID);
              queryAssetsWithAccountId.find({
                success: function(assets) {
                  // show assets on main dashboard page

                }
              });
            }
          });
          */
          window.location.replace('#dashboard');
        },
        error: function(user, error) {
          $("#ErorrMsg").html("Invalid username or password. Please try again.").show();
        }
      });

    };

    this.create = function() {
      var self = this;

      var user = new Parse.User();
      user.set("firstname", $("#FirstName").val());
      user.set("lastname", $("#LastName").val());
      user.set("email", $("#Email").val());
      user.set("username", $("#UserName").val());
      user.set("phone", $("#PhoneNo").val());
      user.set("password", $("#Password").val());
      user.setACL(new Parse.ACL());

      user.signUp(null, {
        success: function(user) {
          self.createSpecificAccountID(user.get("username") + '_AccoundID')
          window.location.replace('#dashboard');
        },

        error: function(user, error) {
          $("#SignUpErrorr").html(error.message).show();
        }
      });

      $("#SignUpError").attr("disabled", "disabled");
      return false;
    };

    this.createSpecificAccountID= function(role_name) {
      var self = this;
      var roleACL = new Parse.ACL();
      roleACL.setWriteAccess(Parse.User.current(), true);
      roleACL.setPublicReadAccess(true);
      var role = new Parse.Role(role_name, roleACL);
      role.getUsers().add(Parse.User.current());

      role.save(null, {
        success: function(saveObject) {
          self.addRoleToKuewAccountID(role)
          self.createSpecificAminRole(role)
          self.updateRoleACL(saveObject);
        },
        error: function(saveObject, error) {
          window.alert("Failed creating role with error: " + error.code + ":"+ error.message);
          console.log(error);
        }
      });
    };

    this.addRoleToKuewAccountID = function(accountID) {
      var query = new Parse.Query(Parse.Role);
      query.equalTo("name", "kuewAccountID");
      query.first({
        success: function(kuewAccountIDRole) {
          // console.log(kuewAccountIDRole)
          kuewAccountIDRole.getRoles().add(accountID);
          kuewAccountIDRole.save();
        },
        error: function(error) {
          alert("Cant find Trail Role. Error is " + error.code + " " + error.message);
          console.log(error);
        }
      })
    }

    this.createSpecificAminRole = function(accountID) {
      var roleACL = new Parse.ACL();
      roleACL.setWriteAccess(Parse.User.current(), true);
      roleACL.setPublicReadAccess(true);
      var adminRole = new Parse.Role(accountID.get("name") + 'Admin', roleACL);
      adminRole.getUsers().add(Parse.User.current());
      // TODO: fix it.Here should be the bug
      accountID.getRoles().add(adminRole);
      adminRole.save();
    }

    this.resetPassword = function() {
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
    };

    this.forgotPassword = function() {
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
    };
  }
});
