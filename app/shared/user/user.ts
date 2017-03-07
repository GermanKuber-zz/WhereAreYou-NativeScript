var validator = require("email-validator");

export class User {
  email: string;
  password: string;
  isValidEmail() {
    return validator.validate(this.email);
  }
}
export class UserLogin {
  email: string;
  password: string;
  isValidEmail() {
    return validator.validate(this.email);
  }
}
export class UserRegister {
  name: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  displayName: string;
  image: string;
  isValidEmail() {
    return validator.validate(this.email);
  }
  isValidRePassword() {
    if (this.password != null
      && this.password.length > 5
      && this.password == this.rePassword)
      return true;
    return false;
  }
}

