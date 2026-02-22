import axios, {AxiosRequestConfig} from 'axios';
import {toast} from "amis";

/**
 * 全局请求拦截，方便对错误进行统一处理
 * @param config
 */
export function request(config: AxiosRequestConfig) {
	let instance = axios.create();

	// 添加响应拦截器处理 401
	instance.interceptors.response.use(
		(response) => response,
		(error) => {
			console.log("Interceptor caught error:", error);

			// 处理 HTTP 401 未授权错误
			if (error.response && error.response.status === 401) {
				console.log("401 Unauthorized detected, redirecting to login");
				window.location.href = '/login';
				return Promise.reject({ isUnauthorized: true, redirected: true });
			}
			return Promise.reject(error);
		}
	);

	return new Promise((resolve, reject) => {
		let onSuccess = (res:any) => {
			if (res.data == null) {
				console.log("reject data")
				reject(res);
			} else if (res.data.status == 40001) {
				// 未登录
				console.log("redirect url", res.data.redirectUrl)
				window.location.href = res.data.redirectUrl;
			} else if (res.data.status == 40002) {
				// 无权限
				console.log("not permission, url", config.url);
				toast['error']('您无访问权限，请申请！', '消息');
				reject(res);
			} else {
				resolve(res)
			}
		}

		let onFail = (error:any) => {
			console.log("onFail", error)
			reject(error);
		}
		return instance.request(config)
			.then(onSuccess, onFail)
			.catch(onFail);
	})
}