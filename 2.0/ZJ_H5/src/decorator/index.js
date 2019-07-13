import { Constant } from './Constant';
import { Scan } from "./Scan";

export { Constant, Scan }

/**
 * 装饰器集成包
 * @author maobi
 * @date 2018年9月2日
 */
@Scan(require.context('./', false, /\.js$/))
export class Decorator {}
export default Decorator;