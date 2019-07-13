import storage from 'vuejs-storage';
import Component from 'vue-class-component';

import { namespace } from 'vuex-class';
export * from 'vue-property-decorator';
export * from 'vuex-class';

export * from './api.decorator';
export * from './constant.decorator';

// Register the router hooks with their names
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
]);

// 已使用的缓存命名空间
const ComponentStorageNs = {};
/**
 * 穿件主组件缓存
 * @param {string} namespace 命名空间
 * @param {Array<String> | String} localKeys 本地缓存键
 * @param {Array<String> | String} sessionKeys 会话缓存键
 */
export function createStorage (namespace, localKeys = [], sessionKeys = []) {
  if (typeof namespace !== 'string' || namespace.length == 0) throw Error('parameter namespace must be not blank string');
  const serialize = JSON.stringify([namespace, localKeys, sessionKeys]);
  if (ComponentStorageNs[namespace] && ComponentStorageNs[namespace] !== serialize) throw new Error(`namespace "${namespace}" already in used`);
  ComponentStorageNs[namespace] = serialize;
  namespace = 'component.' + namespace;
  const cache = [];
  if (typeof localKeys == 'string' && localKeys.length > 0) localKeys = localKeys.split(',');
  if (localKeys && localKeys instanceof Array && localKeys.length > 0) cache.push({ namespace, keys: localKeys, dirver: storage.drivers.localStorage });
  if (typeof sessionKeys == 'string' && sessionKeys.length > 0) localKeys = localKeys.split(',');
  if (sessionKeys && sessionKeys instanceof Array && sessionKeys.length > 0) cache.push({ namespace, keys: sessionKeys, dirver: storage.drivers.sessionStorage });
  return cache;
}

// 缓存NS-Getters
const NGetterCaches = {};
/**
 * 缓存Getter方法
 * @param {string} ns 命名空间，API名称
 * @param {string} stateKey state-key, API.method名称
 */
export function NGetter (ns, stateKey) {
  if (!NGetterCaches[ns]) NGetterCaches[ns] = namespace(ns);
  return NGetterCaches[ns].Getter(stateKey);
}
