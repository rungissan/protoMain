import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

class AuthStore {
  // confirm code

  @observable forgotPassConfirmCode = [];

  @action addForgotPassConfirmCode(value) {
    if (this.forgotPassConfirmCode.length < 6) {
      this.forgotPassConfirmCode.push(value);
    }
  }

  @action getForgotPassConfirmCode() {
     return this.forgotPassConfirmCode;
  }

  @action removeForgotPassConfirmCode() {
    if (this.forgotPassConfirmCode.length > 0) {
      this.forgotPassConfirmCode.pop();
    }
  }

  @action clearForgotPassConfirmCode() {
    this.forgotPassConfirmCode = [];
  }

  // user

  @persist('object') @observable user = {};

  @action setUser(data) {
    this.user = Object.assign(data);
  }

  @action getUser() {
    return this.user;
  }

  @action updateUser(data) {
    this.user = Object.assign({}, this.user, data);
  }

  @action removeUser() {
    this.user = {};
  }

  // reset password

  @persist @observable resetPassEmail = '';

  @action setResetPassEmail(value) {
    this.resetPassEmail = value;
  }

  @action removeResetPassEmail() {
    this.resetPassEmail = '';
  }
}

const observableAuthStore = new AuthStore()
export default observableAuthStore
