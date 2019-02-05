import { AsyncStorage } from 'react-native'
import { create } from 'mobx-persist'

import auth from './stores/auth';
import common from './stores/common';
import account from './stores/account';
import locations from './stores/locations';
import widgets from './stores/widgets';
import notify from './stores/notify'

export default {
  auth,
  common,
  account,
  locations,
  widgets,
  notify
};

export async function rehydrate() {
  const hydrate = create({storage: AsyncStorage, jsonify: true});
  console.log('rehydrate');
  await hydrate('auth', auth);
  await hydrate('common', common);
  await hydrate('locations', locations);
 
  return Promise.resolve();
}

