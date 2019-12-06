import React from "react"

import "./linkButton.less"
export default class LinkButton extends React.Component{
  render(){
    return (
       <button className="linkButton" {...this.props}/>
    )
  }
}