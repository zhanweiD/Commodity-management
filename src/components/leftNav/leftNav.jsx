import React from "react"
import {Link,withRouter} from "react-router-dom"
import { Layout, Menu, Icon } from 'antd'

import menuConfig from "../../config/menuConfig"
import logo from "../../assets/images/logo.png"
import "./leftNav.less"

class LeftNav extends React.Component{
   //方法一，使用数组map方法遍历生产menu。item
  createMenu=(menu)=>{
    const { SubMenu } = Menu
    return menu.map((item)=>{
      if(!item.children){
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
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
              <Link to={now.key}>
                <Icon type={now.icon} />
                <span>{now.title}</span>
              </Link>
          </Menu.Item>
        ))
      }else{
        //根据孩子的key找到父亲的key
        const childrenKey=this.props.location.pathname
        if(now.children.find(item=>item.key===childrenKey)){
          this.openKey=now.key
        }
        pre.push((<SubMenu
          key={now.key}
          title={
            <span>
              <Icon type={now.icon} />
              <span>{now.title}</span>
            </span>
          }
        >{this.createMenu2(now.children)}
        </SubMenu>))
      }
      return pre
    },[])
  }

  
 
  render(){
    this.createMenu=this.createMenu2(menuConfig)
    const pathname=this.props.location.pathname
    const {Sider} = Layout
    return (
        <Sider className="left-nav">
          <a className="left-nav-header" href="/home">
            <img src={logo} alt="图片无法加载"/>
            <span>硅谷后台</span>
          </a>
          <Menu theme="dark" mode="inline" selectedKeys={[pathname]} defaultOpenKeys={[this.openKey]}>
            {/* {this.createMenu(menuConfig)} */}
            {this.createMenu}
          </Menu>
        </Sider>
  
    )
  }
}
export default withRouter(LeftNav)