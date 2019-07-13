
import { Constant } from 'core/decorators';
export * from './BetStatus.constant';
export * from './CustType.constant.constant';
export * from './ImgType.constant';
export * from './OperationMode.constant';
export * from './RechargeStatus.constant';
export * from './GameType.constant';
export * from './UIDice.constant';
export * from './PubConstant.constant';

/**
 * 是否常量类的常量值
 * @param {Constant} constant 常量类
 * @param {constant} value 常量值
 * @return {boolean}
 */
export function isConst (constant, value) {
  if (!Constant.isConstant(constant)) throw new Error('parameter constant not Constant.');
  return Object.keys(constant).filter(key => key.indexOf('C_') == 0).map(key => constant[key]).indexOf(value) !== -1;
}
