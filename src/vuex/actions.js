import * as types from './mutations_type';

export default {
  clear_local: ({
    commit
  }) => {
    commit(types.CLEAR_LOCAL);
  },
  update_local: ({
    commit
  }, {
    memberInfo
  }) => {
    commit(types.UPDATE_LOCAL, memberInfo);
  }
}
