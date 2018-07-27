/*
 *memberInfo用户登录信息
 *pageSize每页显示条目
 *
 */
export default {
  memberInfo: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  pageSize: 10
}
