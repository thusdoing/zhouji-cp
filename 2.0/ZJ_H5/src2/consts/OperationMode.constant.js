
import { Constant } from 'core/decorators';

/**
 * 账户充提操作模式
 * @author maobi
 * @date 2018年9月1日
 */
@Constant
export class OperationMode {
  static '010201' = '公司存款';
  static '010202' = '在线支付';
  static '010203' = '人工存款';
  static '010204' = '快捷支付';

  /** 账户充提操作模式-公司存款 */
  static C_COMPANY_DEPOSIT = '010201';
  /** 账户充提操作模式-在线支付 */
  static C_ONLINE_PAYMENT = '010202';
  /** 账户充提操作模式-人工存款 */
  static C_ARTIFICIAL_DEPOSIT = '010203';
  /** 账户充提操作模式-快捷支付 */
  static C_QUICK_PAYMENT = '010204';
}
