define([
  'jquery',
  'parse'
], function($, P) {

  var KuewAccountID = Parse.Object.extend('KuewAccountID');

  KuewAccountID.prototype.addTrialRoleAsParent = function() {
    var kuewinstance = this;

    var query = new Parse.Query(Parse.Role);
    query.equalTo("name", "Trial");
    query.first({
      success: function(trialRole) {
        console.log(trialRole);
        kuewinstance.set("parent", trialRole);
        kuewinstance.save();
        console.log(kuewinstance);
      },
      error: function(error) {
        alert("Cant find Trail Role. Error is " + error.code + " " + error.message);
        console.log(error);
      }
    })

  }

  return KuewAccountID;

});
