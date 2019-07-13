/**
 * 扫描注解类
 * @author maobi
 * @date 2018年9月2日
 * @param {*} target 
 * @param {string} name 
 * @param {*} descriptor 
 */
export const Scan = function (requireContext, excludes = []) {
  excludes.push('./index.js');
  return (target, name, descriptor) => {
    if (name || descriptor) throw new Error('Can only be used in constant classes.');
    const modules = requireContext.keys().filter(key => excludes.indexOf(key) === -1);
    target = modules.map(requireContext).reduce((contexts, context) => {
      return Object.assign(contexts, context);
    }, {});

    const props = Object.keys(target).filter(prop => target.hasOwnProperty(prop));
    const properties = props.reduce((properties, prop) => {
      properties[prop] = {
        value: target[prop],
        configurable: false,
        enumerable: true,
        writable: false
      };
      return properties;
    }, {});

    return Object.defineProperties({}, properties);
  }
}
