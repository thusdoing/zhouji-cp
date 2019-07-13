import * as type from './mutation-type'

export default {
    [type.ADD_BET] (state, data) {
        if (Array.isArray(data)) {
            state.betRets = state.betRets.concat(data)
        }
        else {
            state.betRets.push(data)
        }
    },
    [type.DELETE_BET] (state, index) {
        state.betRets.splice(index, 1)
    },
    [type.CLEAR_BETRESULT] (state, data) {
        state.betRets = []
    },
    [type.CHANGE_BETMODEL] (state, data) {
        state.betModel = data.betModel
    },
    [type.CHANGE_RESULTPLAY] (state, data) {
        state.resultPlay = data.resultPlay
    },
    [type.SET_YJF] (state, data) {
        state.yjf = data.split("")
        state.betModel = data.split("")[0]
    },
    [type.SET_USER] (state, data) {
        state.sessionUser = data
    }
}