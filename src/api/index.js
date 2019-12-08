//在此模块进行所有ajax发送的定义，并统一暴露出去
import jsonp from "jsonp"
import ajax from "./ajax"
import { message } from "antd"

export {
  reqLogin,
  reqWeather,
  reqCategorys,
  reqAddCategory,
  reqUpdataCategory
}
//5.修改分类名称
function reqUpdataCategory(categoryId,categoryName){
  return ajax({
    method:"post",
    url:"/manage/category/update",
    data:{
      categoryId,
      categoryName
    }
  })
}
//4.添加分类名称
function reqAddCategory(categoryName){
  return ajax({
    method:"post",
    url:"/manage/category/add",
    data:{
      categoryName
    }
  })
}
//3.获取分类名称
function reqCategorys(){
  return ajax("/manage/category/list")
}

//2.获取天气信息
function reqWeather(city){
  return new Promise((resolve,reject)=>{
    const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url,(error,data)=>{
      if (error) {
        message.error("天气请求出错")
      }else{
        const {dayPictureUrl,weather,temperature}=data.results[0].weather_data[2]
        resolve({dayPictureUrl,weather,temperature})
      }
    })
  })
}

//1.发送登录ajax
function reqLogin({username,password}){
  return ajax({
    method:"post",
    url:"/login",
    data:{
      username,
      password
    }
  })
}
