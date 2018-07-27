import * as types from './mutations_type'

let mutations = {
  [types.CLEAR_LOCAL](state) {
    localStorage.removeItem('user');
    state.memberInfo = {};
  },
  [types.UPDATE_LOCAL](state, memberInfo) {
    localStorage.setItem('user', JSON.stringify(memberInfo));
    state.memberInfo = memberInfo;
  }
};
export default mutations
