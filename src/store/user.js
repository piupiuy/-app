import { reqRegister, reqLogin } from '@/api/index.js'
const state = {
  token: ''
}
const mutations = {
  GETTOKEN (state, token) {
    state.token = token
    localStorage.setItem('token', token)
  }
}
const actions = {
  async register ({commit}, params) {
    let result = await reqRegister(params)
    if (result.status === 200) {
      alert(result.data.message)
    }
  },
  async login ({commit}, params) {
    let result = await reqLogin(params)
    if (result.data.code === 200) {
      commit('GETTOKEN', result.data.data.storeid)
    }
    return result.data.code
  }
}
const getters = {}
export default{
  state,
  mutations,
  actions,
  getters
}
