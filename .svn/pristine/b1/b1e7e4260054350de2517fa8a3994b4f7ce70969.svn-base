import { Api, Throttle, SessionCache } from 'core/decorators';
import { fetch } from 'core/tools';

/** 用户操作 */
@Api("User") 
export class User {
  /** 获取用户在线session */
  @SessionCache({ defaultValue: null, cacheTime: 300 })
  static async getOnlineSession () {
    const rsp = await fetch('/getOnlineSession').get();
    return rsp.data;
  }

  /**
   * 用户登录
   * @param  {stirng} custName 登录账号
   * @param  {string} pwd      登录密码
   * @param  {string} verCode  验证码
   * @return {object} 用户主体信息
   */
  @Throttle
  static login ({ custName, pwd, verCode }) {
    return fetch('/api/login').setCrypto(true).post({ custName, pwd, verCode });
  }

  /** 注销登录 */
  @Throttle
  static loginOut () {
    return fetch('/loginOut').get();
  }

  @SessionCache({ defaultValue: {}, cacheTime: 1000 })
  static async getAcct() {
    const rsp = await fetch('/getAcct').get();
    if (!rsp.success) return undefined;
    return rsp.data.t;
  }

  /** 用户注册 */
  @Throttle
  static async register(params) {
    return fetch('/register').setParams(params).post();
  }
}

/** 用户充值 */
@Api("NowPay") 
export class NowPay {

}

/** 用户消息接口 */
@Api("SysMsg") 
export class SysMsg {}

/** 用户账户信息 */
@Api("Acct") 
export class Acct {}
