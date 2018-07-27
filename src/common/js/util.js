//判断数组中是否存在空值
export function arrIsHasNull(arr){
	let startTrue = true;
	for(let i=0;i<arr.length;i++){
		if(arr[i] == ""){
			startTrue = false;
			break;
		}else{
			startTrue = true;
		}
	}
	return startTrue;
}
export function shallowClone(obj){
    var clone = {};
    for(var p in obj){
        if(obj.hasOwnProperty(p)){
            clone[p] = obj[p];
        }
    }
    return clone;
}

export function setName(val){
  return `${val}：`;
}

//去除所有空格
export function trim(str){
	if(str && typeof(str) === 'string'){
		return str.replace(/(^\s*)|(\s*)$/g,'');
	}
}
//提示
export function Message(obj,isClose,mes,setType){
	const type = {0:'error',1:'success',2:'warning'};
	obj.$message({
		showClose: isClose,
	    message:mes,
	    type:type[setType]
  	});
}
//分割id和name
export function toSplit(data,num){
	const id_name_arr = data.split("//");
    return id_name_arr[num];
}

//计算后n分钟的时间
export function addMinutes(date,minutes){
    minutes=parseInt(minutes);
	var interTimes=minutes*60*1000;
	interTimes=parseInt(interTimes);
	return Date.parse(date)+interTimes;
}
//计算前n分钟的时间
export function desendMinutes(date,minutes){
    minutes=parseInt(minutes);
    var interTimes=minutes*60*1000;
    interTimes=parseInt(interTimes);
    return new Date(Date.parse(date)-interTimes);
}
//登录是否超时
export function loginOvertime(loginOutTime){
  	if(loginOutTime < Date.parse(new Date())){
    	return false;
  	}else{
    	return true;
  	}
}
export function isLoginOver(obj){
	if(!loginOvertime(obj.$store.state.memberInfo.loginOut)){
    	obj.$store.dispatch('clear_local');
    	obj.$router.push({ path: '/login' });
  	}else{
    	const memberInfo = {...obj.$store.state.memberInfo,...{loginOut:addMinutes(new Date(),30)}};
    	obj.$store.dispatch('update_local',{memberInfo});
  	}
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function xAxisData(num) {
  let xAxisData = []

  for (let i = 0; i < num; i++) {
    xAxisData.push(i)
  }
  return xAxisData;
}

export function sin(num,cof) {
  let data = []

  for (let i = 0; i < num; i++) {
    data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * cof)
  }
  return data;
}

export function xData(num){
  const data = []
  for (let i = 1; i < num; i++) {
    data.push(i + 'month')
  }
  return data
}

//判断是否为数组类型
export function isArray(obj){
  return (typeof obj == 'object')&&obj.constructor == Array;
}

//判断是否为字符串类型
export function isString(str){
  return (typeof str == 'string')&&str.constructor == String;
}

//判断是否为数值类型
export function isNumber(obj){
  return (typeof obj == 'number')&&obj.constructor == Number;
}

//判断是否为日期类型
export function isDate(obj){
  return (typeof obj == 'object')&&obj.constructor == Date;
}

//判断是否为函数
export function isFunction(obj){
  return (typeof obj == 'function')&&obj.constructor == Function;
}

//判断是否为对象
export function isObject(obj){
  return (typeof obj == 'object')&&obj.constructor == Object;
}

export function filterArr(obj,val){
  let valArr = [];
  for(let i in obj){
    obj[i].map(v => {
      if(v.indexOf("_") == 0){
        const t_val = v.split("_").join("");
        if(val.indexOf(t_val) > -1){
          valArr.push(v)
        }
      }
    })
  }
  return valArr;
}

export function getParent(arr,val){
  let parent = "";
  arr.map((v,i) => {
    if(v.indexOf("_") > 0 && v.indexOf(val) > -1){
      parent = v;
    }
  })
  return parent;
}
