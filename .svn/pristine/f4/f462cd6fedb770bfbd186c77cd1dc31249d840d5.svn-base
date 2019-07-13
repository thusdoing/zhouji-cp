/**
 * 常量类注解
 * @author maobi
 * @date 2018年9月1日
 * @param {constantExtends: []} options 配置
 */
export const Constant = function (options) {
  if (typeof options == 'function') return createDecorator()(options);
  if (options == null || typeof options == 'undefined') return createDecorator();
  if (typeof options == 'object' && options instanceof Array) {
    return createDecorator({ extends: options });
  } else if (typeof options == 'object') return createDecorator(options);
  throw new Error('@Constant parameter error.');
};

const SymbolConstant = `__SymbolConstant_${Math.random().toString(16).substr(2, 6).toUpperCase()}__`;

/**
 * 创建装饰器
 * @param {constantExtends: []} options 配置
 */
const createDecorator = function (options = {}) {
  if (!options.extends || !(options.extends instanceof Array)) options.extends = [];
  const { extends: constantExtends } = options;
  return (target, name, descriptor) => {
    if (name || descriptor) throw new Error('Can only be used in constant classes.');
    const extendsProps = constantExtends.reduce((props, constant) => {
      return { ...props, ...constant };
    }, {});

    // 收集继承属性，自身属性
    const properties = collectProperties({}, extendsProps, target);

    // properties.isConst = {
    //   configurable: false,
    //   enumerable: false,
    //   writable: false,
    //   value (val) {
    //     return Object.keys(this).filter(key => key.indexOf('C_') == 0).map(key => this[key]).indexOf(val) !== -1;
    //   }
    // };
    // console.log(target.name, Object.keys(properties));

    properties[SymbolConstant] = { configurable: false, enumerable: false, writable: false, value: true };
    Object.defineProperties(target, properties);
    return target;
  };
};
/**
 * 收集所有属性，并设置属性权限
 * @param {object} target 被收集属性对象
 * @param {object} properties 收集的属性权限对象
 */
const collectProperties = (properties = {}, ...targets) => {
  if (targets.length == 0) return properties;
  targets.forEach(target => {
    if (!target) return true;
    const props = Object.keys(target);
    props.reduce((properties, prop) => {
      properties[prop] = { value: target[prop], configurable: false, enumerable: true, writable: false };
      return properties;
    }, properties);
  });
  return properties;
};

/**
 * 是否是常量类
 * @param {Constant} constant 常量类
 * @return {boolean}
 */
Constant.isConstant = function (constant) {
  return constant && constant[SymbolConstant];
};
