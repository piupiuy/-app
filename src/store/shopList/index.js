import { reqDishList } from '../../api'
const state = {
  dishList: []
}
const mutations = {
  GETDISH (state, dishList) {
    state.dishList = dishList
  }
}
const actions = {
  async getDish ({commit}, params) {
    let result = await reqDishList(params)
    if (result.data.code === 200) {
      commit('GETDISH', result.data.result)
    } else {
      alert(result.data.message)
    }
  }
}
const getters = {}
export default{
  state,
  mutations,
  actions,
  getters
}
