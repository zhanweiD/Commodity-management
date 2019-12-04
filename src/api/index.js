import axios from "./ajax"

export default {
  login
}

function login(username,password){
  axios({
    method:"post",
    url:"/"
  })

}