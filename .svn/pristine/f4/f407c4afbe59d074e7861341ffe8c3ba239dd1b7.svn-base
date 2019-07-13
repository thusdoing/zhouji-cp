import { Api, LocalCache, Throttle, SessionCache } from 'core/decorators';
import { fetch } from 'core/tools';
import * as consts from '../consts';

/** 查询游戏接口 */
@Api("Game") 
export class Game {
  /** 查询所有游戏类型和游戏 */
  @LocalCache([])
  static async getGameTypeAll () {
    const rsp = await fetch('/getGameTypeAll').get();
    if (!rsp.success) return void 0;
    return rsp.data.list || [];
  }
  /**
   * 获取游戏玩法（统一查询官方与信用玩法）
   * @param {string} gameNo 游戏编号
   */
  @SessionCache({ defaultValue: {}, cacheTime: 1 })
  static async getGameGroupByGameNoCache (gameNo) {
    const rsps = await Promise.all([
      // 查询官方玩法
      fetch('/getGameGroupByGameWithGroup').get({ gameNo, groupType: consts.GamePlayType.C_OFFICIAL }),
      // 查询信用玩法
      fetch('/getGameGroupByGameWithGroup').get({ gameNo, groupType: consts.GamePlayType.C_CREDIT })
    ]);
    // 如果有一个失败，不要数据
    if (rsps.find(d => !d.success)) return void 0;
    const gamePlayGroup = rsps.map(d => d.data.list || []);
    return function (map) {
      return { ...map, [gameNo]: gamePlayGroup };
    };
  }

  @Throttle
  static async creditBet (betVos) {
    // const rsp = await fetch('/game/creditBet').setJson(betVos).post();
    const rsp = await fetch('/game/api/creditBet').setCrypto(true).setJson({betVos}).post();
    return rsp;
  }

  @Throttle
  static async bet (betVos) {
    // const rsp = await fetch('/game/bet').setJson(bets).post();
    // betVos = betVos.map(d => {
    //   const {custNo, custName, custType, gameNo, groupNo, gameNumber, betContent, betMultiple, betNumber, betAmt, estimateProfit, gamePattern, betBackRate} = d;
    //   return {custNo, custName, tttt: 111, custType, gameNo, groupNo, gameNumber, betContent, betMultiple, betNumber, betAmt, estimateProfit, gamePattern, betBackRate}
    // });
    // console.log(betVos);
    const rsp = await fetch('/game/api/bet').setCrypto(true).setJson({betVos}).post();
    return rsp;
  }

  @Throttle
  static async superadditionBet (superadditionBetBaseVos, betBaseVos) {
    const rsp = await fetch('/game/api/superadditionBet').setCrypto(true).setJson({ superadditionBetBaseVos, betBaseVos }).post();
    return rsp;
  }
}
@Api("PlateGame")
export class PlateGame {
  /** 查询所有游戏类型和游戏 */
  @LocalCache([])
  static async getPlateGameAll() {
    const rsp = await fetch('/api/chess/getPlateGameAll').get();
    if (!rsp.success) return void 0;
    return rsp.data.list || [];
  }
}
/** 游戏开奖结果接口 */
@Api("GameOpenNo")
export class GameOpenNo {
  @LocalCache({ defaultValue: {}, cacheTime: 300 })
  static async getGameNextOpenNoCache (gameNo) {
    const rsp = await fetch('/gameOpenNo/getGameNextOpenNo').get({ gameNo });
    if (!rsp.success) return void 0;
    return function (map) {
      return { ...map, [gameNo]: rsp.data.t };
    };
  }

  @LocalCache({ defaultValue: {}, cacheTime: 300 })
  static async getGameLatestOpenNoCache (gameNo) {
    const rsp = await fetch('/gameOpenNo/getGameLatestOpenNo').get({ gameNo });
    if (!rsp.success) return void 0;
    const openedGame = rsp.data.t;
    return function (map) {
      if (openedGame && openedGame.gameOpenNo) openedGame.gameOpenNo = openedGame.gameOpenNo.split(',');
      return { ...map, [gameNo]: openedGame };
    };
  }

  /**
   * 缓存所有游戏的游戏历史记录
   * @param {string}} gameNo
   */
  @LocalCache({ defaultValue: {}, cacheTime: 300 })
  static async getGameLatestOpenNoListHistorysCache (gameNo) {
    const rsp = await fetch('/gameOpenNo/getGameLatestOpenNoList').get({ showCase: true, size: 20, gameNo });
    if (!rsp.success) return void 0;
    return function (map) {
      return { ...map, [gameNo]: rsp.data.list };
    };
  }

  @LocalCache([], 300)
  static async getGameLatestOpenNos (showCase = true) {
    const rsp = await fetch('/gameOpenNo/getGameLatestOpenNos').get({ showCase });
    if (!rsp.success) return void 0;
    return rsp.data.list || [];
  }

  /**
   * 查询游戏开奖结果列表
   * @param {string} gameID 彩种类型 {44:大彩种}{01:小彩种}
   * @param {number} pageIndex 1
   * @param {number} pageSize 30
   * @param {{total: number, page: number, pages: number, pageSize: number, list: Array<Data>}}
   */
  @LocalCache({ defaultValue: {}, cacheTime: 300 })
  static async getLotteryResultListCache (gameID, pageIndex = 1, pageSize = 30) {
    const rsp = await fetch('/gameOpenNo/getLotteryResultList').get({ showCase: true, gameID, pageIndex, pageSize });
    if (!rsp.success) return void 0;
    let { total, list } = rsp.data;
    list.forEach(d => {
      d.result = d.result.replace(/\+/g, ',').split(',');
    });
    if (total > 100) total = 100;
    const pageInfo = { total, page: pageIndex, pageSize, list };
    return function (pageInfos) {
      if (pageInfos[gameID] && pageInfo.page !== 1) {
        pageInfo.list = pageInfo.list.concat(pageInfos[gameID].list);
      }
      return { ...pageInfos, [gameID]: pageInfo };
    };
  }
}

/** 游戏投注接口 */
@Api("Play") 
export class Play {

}

/** 游戏玩法接口  */
@Api("GameGroup") 
export class GameGroup {
  /**
   * 根据游戏编号查询游戏奖金
   * @param {string} gameNo 彩种类型 {44:大彩种}{01:小彩种}
   */
  @Throttle
  static async getGameBounsByGameNo (gameNo) {
    const rsp = await fetch('/gameGroup/getGameBounsByGameNo').get({ gameNo });
    if (!rsp.success) return void 0;
    return rsp.data.gameBouns || [];
  }

  @SessionCache({ defaultValue: {}, cacheTime: 300 })
  static async getGameBonusByGroupNoCache (groupNo) {
    const rsp = await fetch('/gameGroup/getGameBonusByGroupNo').get({ groupNo });
    if (!rsp.success) return undefined;
    return state => ({
      ...state, [groupNo]: rsp.data.list || []
    });
  }
}
