import store from "store"

//对用户登录信息进行保存读取和删除的封装
export{
  saveUser,
  getUser,
  removeUser,
}
function saveUser(user){
  store.set("key_user",user)
}
function getUser(){
  return store.get("key_user")
}
function removeUser(){
  store.remove("key_user")
}