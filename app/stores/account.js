import { observable, action, toJS } from 'mobx'
import { persist } from 'mobx-persist'

class AccountStore {
  @observable postCreation = {};

  @action updatePostCreation(data) {
    this.postCreation = Object.assign({}, this.postCreation, data);
  }

  @action clearPostCreation() {
    this.postCreation = {};
  }

  @action getLocations() {
    return toJS(this.postCreation.selectedLocations)
  }

  @action getSelectedLocations() {
    let locations = toJS(this.postCreation.selectedLocations || {});
    let result = [];

    Object.keys(locations).forEach(key => {
      if (locations[key].isSelected) {
        result.push(locations[key]);
      }
    })

    return result;
  }

  @action addAdditionalPhoto(image) {
    let images = this.postCreation.additionalImages || [];
    images.push(image);

    this.updatePostCreation({additionalImages: images});
  }

  @action removeAdditionalPhoto(index) {
    let images = this.postCreation.additionalImages || [];
    images.splice(index, 1);

    this.updatePostCreation({additionalImages: images});
  }


  @observable openHouseCreation = {};

  @action updateOpenHouseCreation(data) {
    this.openHouseCreation = Object.assign({}, this.openHouseCreation, data);
  }

  @action addConnectedListingToOpenHouseCreation(listing) {
    this.openHouseCreation.connectedListing = listing;
  }

  @action clearOpenHouseCreation() {
    this.openHouseCreation = {};
  }

  @observable listingCreation = {};

  @action updateListingCreation(data) {
    this.listingCreation = Object.assign({}, this.listingCreation, data);
  }

  @action clearListingCreation() {
    this.listingCreation = {};
  }
}

const observableAccountProfStore = new AccountStore();
export default observableAccountProfStore;
