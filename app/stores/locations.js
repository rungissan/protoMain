import { observable, action, computed, toJS } from 'mobx'
import { persist } from 'mobx-persist'

class LocationsStore {
  @observable commonLocations = {};

  @action commonLocationsAdd(location) {
    this.commonLocations = {
      ...this.commonLocations,
      [location.id]: location
    };
  }

  @action clearAllFeedLocations() {
    this.commonLocations = {}
  }

  @action commonLocationsRemove(location) {
    let commonLocations = {...this.commonLocations};
    delete commonLocations[location.id];
    this.commonLocations = commonLocations;
  }

  @action commonLocationsGet() {
    return toJS(this.commonLocations);
  }

  @action removeCommonLocations() {
    this.commonLocations = {};
  }

  @action commonLocationsGetSelected() {
    let locations = toJS(this.commonLocations || {});
    let result = [];

    Object.keys(locations).forEach(key => {
      if (locations[key].isSelected) {
        result.push(locations[key]);
      }
    });

    return result;
  }

  @persist('object') @observable accountLocations = {};

  @action accountLocationsAdd(location) {
    this.accountLocations = {
      ...this.accountLocations,
      [location.id]: location
    };
  }

  @computed get accLocations() {
    return toJS(this.accountLocations);
  }

  @action accountLocationsReset() {
    this.accountLocations = {};
  }

  @action accountLocationsRemove(location) {
    let accountLocations = {...this.accountLocations};
    delete accountLocations[location.id];
    this.accountLocations = accountLocations;
  }
}

const observableAccountStore = new LocationsStore();
export default observableAccountStore;
