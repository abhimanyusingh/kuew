define([
  'jquery',
  'parse'
], function($, P) {

  var KuewAccountID = Parse.Object.extend('KuewAccountID');

  // deprecated
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

  KuewAccountID.prototype.addTrialRoleToRoles = function() {
    var kuewinstance = this;

    var query = new Parse.Query(Parse.Role);
    query.equalTo("name", "Trial");
    query.first({
      success: function(trialRole) {
        console.log(trialRole);
        var relation = kuewinstance.relation("roles");
        relation.add(trialRole);
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
