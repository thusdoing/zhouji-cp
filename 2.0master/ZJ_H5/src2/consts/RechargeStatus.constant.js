import { Constant } from 'core/decorators';

/**
 * 充值状态
 * @author maobi
 * @date 2018年9月1日
 */
@Constant
export class RechargeStatus {
  static '010601' = '申请中';
  static '010602' = '成功';
  static '010603' = '失败';
  static '010604' = '线上申请中';

  /** 充值状态-申请中 */
  static C_APPLYING = '010601';
  /** 充值状态-成功 */
  static C_SUCCESS = '010602';
  /** 充值状态-失败 */
  static C_ERROR = '010603';
  /** 充值状态-线上申请中 */
  static C_ONLINE_APPLYING = '010604';
}
