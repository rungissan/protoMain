import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

class CommonStore {
  // token

  @persist('object') @observable _token = {};

  @action setToken(data) {
    this._token = Object.assign(data);
  }

  @action getToken() {
    return this._token;
  }

  @action updateToken(data) {
    this._token = Object.assign({}, this._token, data);
  }

  @action removeToken() {
    this._token = {};
  }

  @observable _chatMounted = false;

  @action changeChatMountedStatus(status) {
    this._chatMounted = status;
  }

  //reconnect
  userDidDisconnect = false;

  @action setDisconnectStatus(status) {
    this.userDidDisconnect = status;
  }

  @action getDisconnectStatus(){
    return this.userDidDisconnect;
  }
}

const observableStore = new CommonStore()
export default observableStore
