export function isNull(str) {
  return (str == null || str == "" || typeof str != "string");
}
export function isMobile(str) {
  return new RegExp("^0?(13|15|18|14|17)[0-9]{9}$").test(str);
}
export function isLoginPwd(str) {
  return str.length >= 6 && str.length <= 16 && new RegExp(/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){5,15}$/).test(str);
}
export function isPayPwd(str) {
  return /\d{6}/i.test(str);
}
export function isMobileCode(str) {
  return /\d{6}/i.test(str);
}
// 身份证
export function isCertNo(str) {
  return new RegExp(/(^[0-9]{15}$)|(^[0-9]{17}[0-9Xx]$)/).test(str);
}
export function isRealName(str) {
  return new RegExp("^([\u4e00-\u9fa5]{1,})$").test(str);
}
// 邮箱
export function isEmail(str) {
  return new RegExp("^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$").test(str);
}
// 电话号码的函数(包括验证国内区号,国际区号,分机号)
export function isTel(str) {
  return new RegExp("^([0-9]{3,4}-)?[0-9]{7,8}$").test(str);
}
// 图片
export function isPic(str) {
  return new RegExp("(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$").test(str);
}
//二次密码确认
export function isPwdRepeat(str1, str2) {
  return (str1 == str2);
}
//银行卡号
export function isBankCard(str) {
  return new RegExp("^(\\d{14,22})$").test(str);
}
//金额
export function isAmount(str) {
  return str != null && new RegExp("^\\d+(.\\d+)?$").test(str);
}
//最多两位小数
export function decimalPlace(num){
  return new RegExp(/^(([0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/).test(num);
}
//整数
export function isInteger(num){
  return new RegExp(/^[0-9]\d*$/).test(num);
}
//正整数
export function isPositiveInteger(num){
  return new RegExp(/^[1-9]\d*$/).test(num);
}
//年份
export function isYear(str) {
  return new RegExp(/(^19[\d]{2}$)|(^20[\d]{2}$)/).test(str)
}

