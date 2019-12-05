//在此模块进行所有ajax发送的定义，并统一暴露出去

import ajax from "./ajax"

export {
  reqLogin
}

//发送登录ajax
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
