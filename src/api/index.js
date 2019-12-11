//在此模块进行所有ajax发送的定义，并统一暴露出去
import jsonp from "jsonp"
import ajax from "./ajax"
import { message } from "antd"

export {
  reqLogin,
  reqWeather,
  reqCategorys,
  reqAddCategory,
  reqUpdataCategory,
  reqGetProducts,
  reqPutaway,
  reqSearch,
  reqUpdate,
  reqDeleteImg,
  reqAddProduct,
  reqUpdateProduct,
  reqGetClassify,
  reqProduct
}
//14.根据商品ID获取商品信息
function reqProduct(productId) {
  return ajax("/manage/product/info",{
    params:{
      productId
    }
  })
}
//13.根据分类ID获取商品分类
function reqGetClassify(categoryId) {
  return ajax("/manage/category/info",{
    params:{
      categoryId
    }
  })
}
//12.修改商品
function reqUpdateProduct({_id,categoryId,name,desc,price,detail,imgs}) {
  return ajax({
    method:"post",
    url:"/manage/product/update",
    data:{
      _id,
      categoryId,
      name,
      desc,
      price,
      detail,
      imgs
    }
  })
}
//11.添加商品
function reqAddProduct({categoryId,name,desc,price,detail,imgs}) {
  return ajax({
    method:"post",
    url:"/manage/product/add",
    data:{
      categoryId,
      name,
      desc,
      price,
      detail,
      imgs
    }
  })
}
//10.上传图片
function reqUpdate(image) {
  return ajax({
    method:"post",
    url:"/manage/img/upload",
    data:{
      image
    }
  })
}
//9.删除图片
function reqDeleteImg(name) {
  return ajax({
    method:"post",
    url:"/manage/img/delete",
    data:{
      name
    }
  })
}
//8.查找
function reqSearch({pageNum,pageSize,searchType,searchName}) {
  return ajax("/manage/product/search",{
    params:{
      pageNum,
      pageSize,
      [searchType]:searchName,
    }
  })
}
//7.商品上下架
function reqPutaway(productId,status) {
  return ajax({
    method:"post",
    url:"/manage/product/updateStatus",
    data:{
      productId,
      status 
    }
  })
}
//6.获取商品信息
function reqGetProducts(pageNum,pageSize){
  return ajax("/manage/product/list",{
    params: { // 包含所有query参数的对象
      pageNum,
      pageSize
    }})
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
