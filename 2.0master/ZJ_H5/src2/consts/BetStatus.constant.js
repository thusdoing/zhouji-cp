import { Constant } from 'core/decorators';

/**
 * 投注状态
 *
 * @author maobi
 * @date 2018年9月2日
 */
@Constant
export class BetStatus {
  static '0' = '待开奖';
  static '1' = '未中奖';
  static '2' = '已中奖';
  static '3' = '已撤单';

  /** 投注状态-待开奖 */
  static C_WAITING_OPEN = '0';
  /** 投注状态-未中奖 */
  static C_LOSE = '1';
  /** 投注状态-已中奖 */
  static C_WON = '2';
  /** 投注状态-已撤单 */
  static C_REVOKED = '3';
}

/**
 * 追投状态
 * @author maobi
 * @date 2018年9月2日
 */
@Constant([ BetStatus ])
export class BonusStatus extends BetStatus {
  /** 追投状态-已结束 */
  static C_FINISHED_CH = '已结束';
  /** 追投状态-已终止 */
  static C_TERMINATED_CH = '已终止';
};
