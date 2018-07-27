import axios from 'axios';
import axiosApi from './axiosApi';

function showError(obj,error){
	obj.listLoading = false;
	const errorObj = Promise.reject(error);
	const errorStatus = errorObj._v.response.status;
	let errorMsg = "";
	switch (errorStatus) {
        case 400:
          errorMsg = '请求错误'
          break
        case 403:
          errorMsg = '拒绝访问'
          break
        case 404:
          errorMsg = `请求地址出错`
          break
        case 408:
          errorMsg = '请求超时'
          break
        case 500:
          errorMsg = '服务器内部错误'
          break
        case 501:
          errorMsg = '服务未实现'
          break
        case 502:
          errorMsg = '网关错误'
          break
        case 503:
          errorMsg = '服务不可用'
          break
        case 504:
          errorMsg = '网关超时'
          break
        default:
        	errorMsg = error
    }
	obj.$message.error(errorMsg);
}

export const httpPost = (obj,url,params) => {
	return axios.post(url, params).then(res => {
		if(res.status == 200){
			return res.data;
		}else{
			obj.listLoading = false;
			obj.$message.error(res.statusText);
		}
	}).catch(function(error) {
		showError(obj,error);
	});
}

export const httpPostCof = (obj,url,params,cof) => {
	return axios.post(url,params,cof).then(res => {
		if(res.status == 200){
			return res.data;
		}else{
			obj.listLoading = false;
			obj.$message.error(res.statusText);
		}
	}).catch(function(error) {
		showError(obj,error);
	});
}

export const httpGet = (obj,url,params) => {
	return axios.get(url,{params:params}).then(res => {
		if(res.status == 200){
			return res.data;
		}else{
			obj.listLoading = false;
			obj.$message.error(res.statusText);
		}
	}).catch(function(error) {
		showError(obj,error);
	});
};

export const httpPut = (obj,url,params) => {
	return axios.get(`${url}${params}`).then(res => {
		if(res.status == 200){
			return res.data;
		}else{
			obj.listLoading = false;
			obj.$message.error(res.statusText);
		}
	}).catch(function(error) {
		showError(obj,error);
	});
};
