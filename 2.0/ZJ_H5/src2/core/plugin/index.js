import VuxPlugin from './vux.plugin';
import EnvPlugin from './env.plugin';
import AppPlugin from './app.plugin';
import VuejsStoragePlugin from 'vuejs-storage';

function install (Vue) {
  Vue.use(EnvPlugin);
  Vue.use(VuxPlugin);
  Vue.use(AppPlugin);
  Vue.use(VuejsStoragePlugin);
}

export default { install };
