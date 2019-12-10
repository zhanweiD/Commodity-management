import React from "react"
import { Modal } from 'antd';
import {withRouter} from "react-router-dom"

import LinkButton from "../link-button/linkButton"
import {reqWeather} from "../../api"
import {formateDate} from "../../utils/dateUtils"
import menuConfig from "../../config/menuConfig"
import {removeUser} from "../../utils/localStorageUtils"
import memoryUser from "../../utils/memoryUtils"
import "./herder.less"

class Header extends React.Component{
  state={time:formateDate(Date.now()),dayPictureUrl:"",weather:"",temperature:""}
  //获取天气信息
  getWeather=async(city)=>{
    const {dayPictureUrl,weather,temperature}=await reqWeather(city)
    this.setState({dayPictureUrl,weather,temperature})
  }
  componentDidMount(){
    //1.开启定时器
    this.intervalId=setInterval(()=>{
      this.setState({time:formateDate(Date.now())})
    },1000)
    this.getWeather("郑州")
  }
  componentWillUnmount(){
    clearInterval(this.intervalId)
  }
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
        const childItem=item.children.find(item=>titlekey.indexOf(item.key)===0)
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
          {/* <button onClick={this.showConfirm}>退出</button> */}
          <LinkButton onClick={this.showConfirm}>退出</LinkButton>
        </div>
        <div className="layout-header-bottom">
          <h2 className="header-bottom-left">{showTitle}</h2>
          <div className="header-bottom-right">
            <span>{this.state.time}</span>
            <img src={this.state.dayPictureUrl} alt="天气"/>
            <span>{this.state.weather}</span>&nbsp;
            <span>{this.state.temperature}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)