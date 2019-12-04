import React from "react"

export default class Admin extends React.Component{
  render(){
    if(!localStorage.getItem("key-user")){
      this.props.history.replace('/login')
    }
    return(
      <h1>Admin</h1>
    )
  }
}