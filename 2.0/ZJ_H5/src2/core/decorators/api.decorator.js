import storage from 'vuejs-storage';
import store from '../../store';

/**
 * 本地缓存，使用localStorage与Vuex.store做缓存
 * @param {object} options 参数如下
 * @param {number} options.cacheTime 间隔时间，单位毫秒，默认: 60 * 1000
 * @return api.method
 */
export const LocalCache = function (options, ...args) {
  if (options && options instanceof Array) options = { defaultValue: options, cacheTime: args[0] };
  if (typeof options == 'function') return createCacheFactory(storage.drivers.localStorage, {})(options, ...args);
  if (options != null && typeof options == 'object') return createCacheFactory(storage.drivers.localStorage, options);
  throw new Error('@LocalCache error refernce');
};

/**
 * 本地缓存，使用sessionStorage与Vuex.store做缓存
 * @param {object} options 参数如下
 * @param {number} options.cacheTime 间隔时间，单位毫秒，默认: 60 * 1000
 * @return api.method
 */
export const SessionCache = function (options, ...args) {
  if (options && options instanceof Array) options = { defaultValue: options, cacheTime: args[0] };
  if (typeof options == 'function') return createCacheFactory(storage.drivers.sessionStorage, {})(options, ...args);
  if (options != null && typeof options == 'object') return createCacheFactory(storage.drivers.sessionStorage, options);
  throw new Error('@SessionCache error refernce');
};

/**
 * 本地缓存，使用ex.store做缓存
 * @param {object} options 参数如下
 * @param {number} options.cacheTime 间隔时间，单位毫秒，默认: 60 * 1000
 * @return api.method
 */
export const Cache = function (options, ...args) {
  if (options && options instanceof Array) options = { defaultValue: options, cacheTime: args[0] };
  if (typeof options == 'function') return createCacheFactory(null, {})(options, ...args);
  if (options != null && typeof options == 'object') return createCacheFactory(null, options);
  throw new Error('@Cache error refernce');
};

const createCacheFactory = function (driver, options) {
  if (!options.cacheTime || options.cacheTime <= 0) options.cacheTime = 1000 * 60;
  return function (target, name, descriptor) {
    if (typeof options.defaultValue == 'undefined') {
      debugger;
      throw new Error(`please support defaultValue in ${target.name}.${name}`);
    }
    const apis = getSymbolApis(target);
    const method = target[name];
    let prevResultPromise = null;
    const fn = function (moduleName) {
      return async function (...args) {
        // 使用上次没有处理完的结果，如果上次没有请求获取仓库的值
        const prev = await prevResultPromise || await store.state[moduleName][name];
        const now = Date.now();
        if (prev && prev.time && now - prev.time <= options.cacheTime) {
          return prev.data;
        }
        let result = prevResultPromise = new Promise(async resolve => {
          const time = Date.now();
          let data = await method(...args);
          if (typeof data == 'undefined') {
            resolve(prev.data);
            prevResultPromise = null;
          } else {
            if (typeof data == 'function') data = data(prev.data);
            result = { time, data, info: new Date(time).toLocaleString() };
            store.commit(`${moduleName}/${name}`, result);
            resolve(result);
          }
        });
        return result;
        // 如何执行函数是同步函数，纯函数，方法内部已设定，就不在同步
        // if (result !== store.state[moduleName][name]) store.commit(`${moduleName}/${name}`, result);
      };
    };
    apis.push({ ...options, name, fn, driver, __API_TYPE__: 'cache' });
  };
};

/**
 * 节流
 * @param {{throttleTime: number}}} options options.throttleTime 默认300ms
 * @param  {...any} args 其他参数
 * @return any
 */
export const Throttle = function (options, ...args) {
  if (options && typeof options == 'number') options = { throttleTime: options };
  if (typeof options == 'function') return createThrottleFactory({})(options, ...args);
  if (options != null && typeof options == 'object') return createThrottleFactory(options);
  throw new Error('@Throttle error refernce');
};

function createThrottleFactory (options) {
  if (!options.throttleTime || options.throttleTime <= 0) options.throttleTime = 300;
  return function (target, name, descriptor) {
    const method = target[name];
    let prevTime = -1;
    const fn = function (moduleName) {
      return function (...args) {
        const now = Date.now();
        return new Promise(async resolve => {
          if (now - prevTime < options.throttleTime) return void 0;
          prevTime = now;
          const data = await method(...args);
          if (!options.ignoreError || typeof data !== 'undefined') resolve(data);
        });
      };
    };
    // Object.defineProperty(target, name, { enumerable: true, writable: false, configurable: true, value: fn });
    target[name] = fn;
    descriptor.configurable = false; descriptor.writable = false;
    const apis = getSymbolApis(target);
    apis.push({ name, fn });
  };
}

/**
 * 接口，并创建vux.module, 依据接口method是否创建storagePlugin
 * @param {object} options 参数如下
 * @param {string} options.name 模块名称(store.moduleName) 默认：类名称
 * @return api
 */
export const Api = function (options) {
  if (typeof options == 'string') options = { name: options };
  if (typeof options == 'function') return createApiFactory({})(options);
  if (options != null && typeof options == 'object') return createApiFactory(options);
  throw new Error('@Api error refernce');
};

function createApiFactory (options) {
  return function (target) {
    const moduleName = options.name;
    if (!moduleName) throw new Error('@Api name(store.module_name) invalid error');
    // if (store.state[moduleName]) throw new Error('@Api name(store.module_name) duplicate error');
    // if (!moduleName) throw new Error('@Api name(store.module_name) invalid error');
    if (store.state[moduleName]) {
      console.error(store.state, moduleName, options, target);
      throw new Error(`@Api name(${moduleName}) duplicate error`);
    }

    const module = { namespaced: true, state: {}, mutations: {}, getters: {} };
    const apis = getSymbolApis(target) || [];

    const plugins = [];
    const namespace = `store.${moduleName}`;
    const sessionKeys = [];
    const localKeys = [];
    apis.forEach(({ __API_TYPE__, name, driver, defaultValue }) => {
      if (__API_TYPE__ == 'cache') {
        if (defaultValue != null) module.state[name] = { data: defaultValue };
        else module.state[name] = {};
        module.getters[name] = function (state) {
          return state[name].data;
        };
        module.mutations[name] = function (state, payload) {
          state[name] = payload;
        };
        if (driver === storage.drivers.localStorage) {
          localKeys.push(`${moduleName}.${name}`);
        } else if (driver === storage.drivers.sessionStorage) {
          sessionKeys.push(`${moduleName}.${name}`);
        }
        // 加入插件
        // if (driver) plugins.push(storage({ namespace, driver, keys: [ `${moduleName}.${name}` ] }));
      }
    });

    if (localKeys.length > 0) plugins.push(storage({ namespace, driver: storage.drivers.localStorage, keys: localKeys }));
    if (sessionKeys.length > 0) plugins.push(storage({ namespace, driver: storage.drivers.sessionStorage, keys: sessionKeys }));

    // 注册模块
    store.registerModule(moduleName, module);
    // 注册插件
    plugins.forEach(plugin => plugin(store));
    const api = {};
    apis.forEach(({ name, fn }) => Object.defineProperty(api, name, { configurable: false, writable: false, enumerable: true, value: fn(moduleName) }));
    return api;
  };
}

/** 特殊API符号 */
const SYMBOL_APIS = `SYMBOL_APIS` + Math.random().toString(16).substr(0, 4).toUpperCase(0);
function getSymbolApis (target) {
  if (target[SYMBOL_APIS]) return target[SYMBOL_APIS];
  Object.defineProperty(target, SYMBOL_APIS, {
    value: [], enumerable: false, configurable: false, writable: false
  });
  return target[SYMBOL_APIS];
}
