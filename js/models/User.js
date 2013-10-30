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
          window.location.replace('#dashboard');
        },

        error: function(user, error) {
          $("#SignUpErrorr").html(error.message).show();
        }
      });

      $("#SignUpError").attr("disabled", "disabled");
      return false;
    }
  }
});
