import ajax from "./ajax"

export {
  reqLogin
}

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
