"use strict";
var validator = require("email-validator");
var User = (function () {
    function User() {
    }
    User.prototype.isValidEmail = function () {
        return validator.validate(this.email);
    };
    return User;
}());
exports.User = User;
var UserLogin = (function () {
    function UserLogin() {
    }
    UserLogin.prototype.isValidEmail = function () {
        return validator.validate(this.email);
    };
    return UserLogin;
}());
exports.UserLogin = UserLogin;
var UserRegister = (function () {
    function UserRegister() {
    }
    UserRegister.prototype.isValidEmail = function () {
        return validator.validate(this.email);
    };
    UserRegister.prototype.isValidRePassword = function () {
        if (this.password != null
            && this.password.length > 5
            && this.password == this.rePassword)
            return true;
        return false;
    };
    return UserRegister;
}());
exports.UserRegister = UserRegister;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRTNDO0lBQUE7SUFNQSxDQUFDO0lBSEMsMkJBQVksR0FBWjtRQUNFLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksb0JBQUk7QUFPakI7SUFBQTtJQU1BLENBQUM7SUFIQyxnQ0FBWSxHQUFaO1FBQ0UsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksOEJBQVM7QUFPdEI7SUFBQTtJQWtCQSxDQUFDO0lBVkMsbUNBQVksR0FBWjtRQUNFLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0Qsd0NBQWlCLEdBQWpCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJO2VBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUM7ZUFDeEIsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWxCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbInZhciB2YWxpZGF0b3IgPSByZXF1aXJlKFwiZW1haWwtdmFsaWRhdG9yXCIpO1xuXG5leHBvcnQgY2xhc3MgVXNlciB7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG4gIGlzVmFsaWRFbWFpbCgpIHtcbiAgICByZXR1cm4gdmFsaWRhdG9yLnZhbGlkYXRlKHRoaXMuZW1haWwpO1xuICB9XG59XG5leHBvcnQgY2xhc3MgVXNlckxvZ2luIHtcbiAgZW1haWw6IHN0cmluZztcbiAgcGFzc3dvcmQ6IHN0cmluZztcbiAgaXNWYWxpZEVtYWlsKCkge1xuICAgIHJldHVybiB2YWxpZGF0b3IudmFsaWRhdGUodGhpcy5lbWFpbCk7XG4gIH1cbn1cbmV4cG9ydCBjbGFzcyBVc2VyUmVnaXN0ZXIge1xuICBuYW1lOiBzdHJpbmc7XG4gIGxhc3ROYW1lOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG4gIHJlUGFzc3dvcmQ6IHN0cmluZztcbiAgZGlzcGxheU5hbWU6IHN0cmluZztcbiAgaW1hZ2U6IHN0cmluZztcbiAgaXNWYWxpZEVtYWlsKCkge1xuICAgIHJldHVybiB2YWxpZGF0b3IudmFsaWRhdGUodGhpcy5lbWFpbCk7XG4gIH1cbiAgaXNWYWxpZFJlUGFzc3dvcmQoKSB7XG4gICAgaWYgKHRoaXMucGFzc3dvcmQgIT0gbnVsbFxuICAgICAgJiYgdGhpcy5wYXNzd29yZC5sZW5ndGggPiA1XG4gICAgICAmJiB0aGlzLnBhc3N3b3JkID09IHRoaXMucmVQYXNzd29yZClcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4iXX0=