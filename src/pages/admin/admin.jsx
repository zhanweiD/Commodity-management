import React from "react"
import {Redirect} from "react-router-dom"

import memoryUtils from "../../utils/memoryUtils"

export default class Admin extends React.Component{
  render(){
    if(!memoryUtils.user){
      return <Redirect to="/login"/>
    }
    return(
      <h1>Admin</h1>
    )
  }
}