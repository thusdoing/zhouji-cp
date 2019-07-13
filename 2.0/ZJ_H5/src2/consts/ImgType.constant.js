import { Constant } from 'core/decorators';
/**
 * 图片类型
 * @author maobi@gmail.com
 * @date 2018年9月7日
 */
@Constant
export class ImgType {
  /* eslint-disable */
  // 010401	LOGO图片(1张)
  // 010404	手机购彩背景(1张)
  // 010403	推广图(2张)
  // 010402	背景图片(8张)

  /** 图片类型-LOGO图片(1张) */
  static C_LOGO = '010401';
  /** 图片类型-背景图片(8张) */
  static C_BJ = '010402';
  /** 图片类型-推广图(2张) */
  static C_TGT = '010403';
  /** 图片类型-手机购彩背景(1张) */
  static C_SJGCBJ = '010404';
}
