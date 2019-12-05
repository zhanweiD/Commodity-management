import React from "react"
import { Modal } from 'antd';
import {withRouter} from "react-router-dom"

import menuConfig from "../../config/menuConfig"
import {removeUser} from "../../utils/localStorageUtils"
import memoryUser from "../../utils/memoryUtils"
import "./herder.less"

class Header extends React.Component{
  showConfirm=()=> {
    Modal.confirm({
      title: '你确定退出登录吗?',
      onOk:()=> {
        removeUser()
        memoryUser.user={}
        this.props.history.replace('/login')
      },
      // onCancel:()=> {

      // },
    });
  }
  showTitle=()=>{
    let title=""
    const titlekey=this.props.location.pathname
    menuConfig.forEach((item)=>{
      if(!item.children){
        if(item.key===titlekey){
          title=item.title
        }
      }else{
        const childItem=item.children.find(item=>item.key===titlekey)
        if(childItem){
          title=childItem.title
        }
      }
    })
    return title
  }
  render(){   
    const showTitle=this.showTitle()
    return (
      <div className="layout-header">
        <div className="layout-header-top">
          <span>欢迎，{memoryUser.user.username}</span>
          <button href="#1" onClick={this.showConfirm}>退出</button>
        </div>
        <div className="layout-header-bottom">
          <h2 className="header-bottom-left">{showTitle}</h2>
          <div className="header-bottom-right">
            <span>2019-12-5 21:2:30</span>
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气"/>
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)