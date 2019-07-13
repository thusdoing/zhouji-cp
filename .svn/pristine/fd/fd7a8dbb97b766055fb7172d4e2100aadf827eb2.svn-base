import { Api, LocalCache } from 'core/decorators';
import { fetch } from 'core/tools';

/** 规则帮助接口 */
@Api("Rules")
export class Rules {

}

/** 活动接口 */
@Api("Activity")
export class Activity {}

/** 系统公告接口 */
@Api("Notice")
export class Notice {
  @LocalCache([])
  static async getNotice () {
    const rsp = await fetch('/getNotice').get();
    if (!rsp.success) return void 0;
    return rsp.data.list || [];
  }
}

@Api("WebConfig")
export class WebConfig {
  @LocalCache([])
  static async getBannerConfig () {
    const rsp = await fetch('/getBannerConfig').get();
    if (!rsp.success) return void 0;
    return rsp.data.list || [];
  }

  /**
   * 查询注册时需要的配置
   * 动态添加注册需要字段
   */
  @LocalCache([])
  static async getConfigOfRegister () {
    const rsp = await fetch('/getConfig').get({codeType: 'register'});
    if (!rsp.success) return void 0;
    return rsp.data.list || [];
  }


  @LocalCache([])
  static async getHomeConfig () {
    const rsp = await fetch('/getHomeConfig').get();
    if (!rsp.success) return void 0;
    return rsp.data.list || [];
  }


}
