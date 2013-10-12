define(['parse'],function(){

    function kuewUser() {

        this.logInUser = function(email, password, successCallback, errorCallBack) {
            Parse.User.logIn(email, password, {
                success: function(user) {
                    sucessCallback(user);
                },

                error: function(user, error) {
                    errorCallBack(user, error);
                }
            });

        };

        this.createUser = function(userObj, successCallback, errorCallBack) {
            var self =  this;
            var user = new Parse.User();
            user.set("title",   userObj.title   || '');
            user.set("firstname",   userObj.firstName   || '');
            user.set("lastname",    userObj.lastName    || '');
            user.set("email",       userObj.email       || '');
            user.set("username",    userObj.username    || '');
            user.set("phone",       userObj.phone       || '');
            user.set("password",    userObj.password   || '');
            user.set("reportsTo",   userObj.ReportsTo   || '');
            user.set("facebookId",  userObj.facebookId  || '');
            user.set("twitterId",   userObj.twitterId   || '');
            user.set("role",  userObj.role  || '');
            user.set("tasksOwned",  userObj.tasksOwned  || '');
            user.set("TasksAssigned",  userObj.TasksAssigned  || '');
            user.set("MilestonesOwned",  userObj.MilestonesOwned  || '');
            user.set("MilestonesAssigned",  userObj.MilestonesAssigned  || '');
            user.set("IsAccountOwner",  userObj.IsAccountOwner  || false);
            user.setACL(new Parse.ACL());

            user.signUp(null, {
                success: function(user) {
                    self.createRole(user.attributes.role)
                    successCallback(user);
                },

                error: function(user, error) {
                    errorCallBack(user, error);
                }
            });
        };

        this.createRole= function(role) {
            var self = this;
            var roleACL = new Parse.ACL();
            roleACL.setWriteAccess(Parse.User.current(), true);
            roleACL.setPublicReadAccess(true);
            var role = new Parse.Role(role, roleACL);
            role.getUsers().add(Parse.User.current());

            role.save(null, {
                success: function(saveObject) {
                    // The object was saved successfully.
                    alert('role creation done');
                    self.updateRoleACL(saveObject);
                },
                error: function(saveObject, error) {
                    // The save failed.
                    window.alert("Failed creating role with error: " + error.code + ":"+ error.message);
                    //assignRoles();
                }
            });
        };

        this.getUser = function() {
            var self = this;
            var query = new Parse.Query(Parse.User);
            query.get(Parse.User.current().id ,{
                success: function(returnObj) {
                    alert(returnObj.get("username"));
                    //self.getRole(returnObj);
                },
                error: function(returnObj, error) {
                    window.alert("Failed with error: " + error.code + ":"+ error.message);
                }
            });
        };

        this.updateRoleACL = function  (role) {
            var self = this;
            var roleACL = role.getACL();
            roleACL.setWriteAccess(Parse.User.current(), false);
            roleACL.setRoleWriteAccess(role,true);
            role.save(null, {
                success: function(saveObject) {
                    // The object was saved successfully.
                    alert('role acl updated');
                    self.getUser();
                },
                error: function(saveObject, error) {
                    // The save failed.
                    window.alert("Failed updating role with error: " + error.code + ":"+ error.message);
                }
            })
        };
    }
    return kuewUser;
});
