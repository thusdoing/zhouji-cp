/**
 * 常量类注解
 * @author maobi
 * @date 2018年9月1日
 */
 export const Constant = function(options) {
   if (typeof options == 'function') return createDecorator()(options);
   if (options == null || typeof options === 'undefined') return createDecorator();
   if (typeof options == 'object' && options instanceof Array) return createDecorator({extends: options});
   else if (typeof options == 'object') return createDecorator(options);
   throw new Error(`@Constant parameter error.`);
 }

/**
 * 创建装饰器
 */
const createDecorator = function (options = {}) {
  if (!options.extends || !options.extends instanceof Array) options.extends = [];
  const { extends: constantExtends } = options;
  return (target, name, descriptor) => {
    if (name || descriptor) throw new Error('Can only be used in constant classes.');
    const extendsProps = constantExtends.reduce((props, constant) => {
      return { ...props, ...constant }
    }, {});

    const properties = {};
    // 继承属性
    flatProperties(extendsProps, properties);
    // 自身属性
    flatProperties(target, properties);

    return Object.defineProperties({}, properties);
  }
}

/**
 * 扁平化属性
 */
const flatProperties = (target, properties = {}) => {
  const props = Object.keys(target).filter(prop => target.hasOwnProperty(prop));
  properties = props.reduce((properties, prop) => {
    properties[prop] = {
      value: target[prop],
      configurable: false,
      enumerable: true,
      writable: false
    };
    return properties;
  }, properties);
  return properties;
}