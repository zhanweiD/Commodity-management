//封装axios

import axios from "axios"
import qs from "qs"
import {message} from "antd"

//添加请求拦截
axios.interceptors.request.use(function (config) {
  const {method,data}=config
  if(method.toLowerCase()==="post"&&typeof(data)==="object"){
    //如果是post请求且data为对象，则将其转为字符串
    config.data=qs.stringify(data)
  }
  return config
})

//添加响应拦截
axios.interceptors.response.use(function (response) {
  //直接将响应数据返回，过滤其他信息
  
  return response.data;
}, function (error) {
  //请求出错后，在这里统一抛出，并中断promise链
  message.error('请求出错 ' + error.message)
  return new Promise(()=>{})
});

export default axios