
export default {
  namespaced: true,
  state: {
    bets: [],
    betModel: 0,
    gameNo: null
  },
  mutations: {
    addBets (state, payload) {
      state.bets.push(...payload);
    },
    addBet (state, payload) {
      state.bets.push(payload);
    },
    delBet (state, payload) {
      state.bets.splice(payload, 1);
    },
    clearBets (state, payload) {
      state.bets = [];
    },
    updateBetModel (state, payload) {
      if (state.betModel != payload) state.betModel = payload;
    },
    updateGameNo (state, payload) {
      if (!payload || payload == state.gameNo) return;
      state.gameNo = payload;
      state.bets.splice(0);
    }
  }
};
