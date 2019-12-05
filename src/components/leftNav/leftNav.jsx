import React from "react"
import { Layout, Menu, Icon } from 'antd'

import menuConfig from "../../config/menuConfig"
import logo from "../../assets/images/logo.png"
import "./leftNav.less"

export default class LeftNav extends React.Component{
   //方法一，使用数组map方法遍历生产menu。item
  createMenu=(menu)=>{
    const { SubMenu } = Menu
    return menu.map((item)=>{
      if(!item.children){
        return (
          <Menu.Item key={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Menu.Item>
        )
      }
      else{
        return (
          <SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >{this.createMenu(item.children)}
        </SubMenu>
        )
      }
    })
  }
   //方法二，使用数组reduce方法生产menu。item
  createMenu2=(menu)=>{
    const { SubMenu } = Menu
    return menu.reduce((pre,now)=>{
      if(!now.children) {
        pre.push(
          (<Menu.Item key={now.key}>
            <Icon type={now.icon} />
            <span>{now.title}</span>
          </Menu.Item>
        ))
      }else{
        pre.push((<SubMenu
          key={now.key}
          title={
            <span>
              <Icon type={now.icon} />
              <span>{now.title}</span>
            </span>
          }
        >{this.createMenu(now.children)}
        </SubMenu>))
      }
      return pre
    },[])
  }
 
  render(){
    const {Sider} = Layout;
    return (
        <Sider className="left-nav">
          <a className="left-nav-header" href="#1">
            <img src={logo} alt="图片无法加载"/>
            <span>硅谷后台</span>
          </a>
          <Menu theme="dark" defaultSelectedKeys={["/home"]} mode="inline">
            {/* {this.createMenu(menuConfig)} */}
            {this.createMenu2(menuConfig)}
          </Menu>
        </Sider>
  
    )
  }
}