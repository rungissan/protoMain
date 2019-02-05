import { observable, action } from 'mobx'


class WidgetStore {

  @observable _newMessage = {};

  @action setNewMessage(data) {
    this._newMessage = data;
  }
}

const observableWidgetStore = new WidgetStore()
export default observableWidgetStore;