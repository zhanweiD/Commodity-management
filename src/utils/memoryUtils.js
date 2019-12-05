import {getUser} from "./localStorageUtils"

//将用户信息写入内存中，避免反复操作local文件
const user=getUser()
export default{
  user
}