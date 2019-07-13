export default {
    totalBetNumber (state) {
        return state.betRets.reduce((x,y) => {
            return x + y.betNumber
        }, 0)
    },
    totalBetAmt (state) {
        return state.betRets.reduce((x,y) => {
            return x + y.betAmt
        }, 0)
    }
}