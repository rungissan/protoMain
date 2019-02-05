import { observable, action } from 'mobx'

class NotifyStore {
  @observable netStatus = false;

  @action setStatus(status) {
    this.netStatus = status;
  }

  @action clearStatus() {
    this.netStatus = false;
  }

  @action getStatus() {
    return this.netStatus;
  }
}

const observableNotifyStore = new NotifyStore();
export default observableNotifyStore;
