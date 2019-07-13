import { Constant } from 'core/decorators';

/**
 * 客户类型
 * @author maobi
 * @date 2018年9月1日
 */
@Constant
export class CustType {
  static '010701' = '代理';
  static '010703' = '会员';
  static '010704' = '试玩';

  /** 客户类型-代理 */
  static C_AGENT = '010701';
  /** 客户类型-会员 */
  static C_MEMBER = '010703';
  /** 客户类型-试玩 */
  static C_TRIAL = '010704';
}
