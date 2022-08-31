import { reqStoreInfo } from '@/api'
const state = {
  userinfo: {}
}
const mutations = {
  GETINFO (state, userinfo) {
    state.userinfo = userinfo
  }
}
const actions = {
  async getInfo ({commit}, params) {
    let result = await reqStoreInfo(params)
    if (result.data.code === 200) {
      commit('GETINFO', result.data.data[0])
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
