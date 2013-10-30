define([
  'jquery',
  'parse'
], function($, P) {
  return function() {
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
