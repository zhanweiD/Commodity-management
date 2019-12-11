import {getUser} from "./localStorageUtils"

//将用户信息写入内存中，避免反复操作local文件
const user=getUser()
//暴漏出去一个对象，通过对象.user的方式可以间接修改user的值
export default{
  user,
  product:{}    //存放商品信息
}