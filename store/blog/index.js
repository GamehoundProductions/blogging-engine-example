import state from './state'
import actions from './actions'
import mutations from './mutations'


export default {
  state,
  getters: { ...state().makeGetters() },
  actions,
  mutations,
  namespaced: true
}
