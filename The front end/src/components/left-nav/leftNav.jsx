import React from "react"
import {Link,withRouter} from "react-router-dom"
import { Layout, Menu, Icon } from 'antd'

import memoryUtils from "../../utils/memoryUtils"
import menuConfig from "../../config/menuConfig"
import logo from "../../assets/images/logo.png"
import "./leftNav.less"

class LeftNav extends React.Component{

  //判断当前用户是否有此Item的访问权限
  hasItem=(item)=>{
    // 得到当前用户的所有权限
    const user = memoryUtils.user
    const menus = user.role.menus
    // 1. 如果当前用户是admin
    // 2. 如果item是公开的
    // 3. 当前用户有此item的权限
    if(item.public||user.username==="admin"||menus.indexOf(item.key)!==-1){
      return true
    }else if(item.children){
    // 4. 如果当前用户有item的某个子节点的权限, 当前item也应该显示
      const cItem = item.children.find(cItem => menus.indexOf(cItem.key)!==-1)
      return !!cItem 
    }
    return false
  }

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
    //1.role.menus为空
    return menu.reduce((pre,now)=>{
      if(this.hasItem(now)){
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
          if(now.children.find(item=>childrenKey.indexOf(item.key)===0)){
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
      }
      return pre
    },[])
  }

  
 
  render(){
    this.createMenu=this.createMenu2(menuConfig)
    let pathname=this.props.location.pathname
    if (pathname.indexOf('/product')===0) {
      pathname = '/product'
    }
    const {Sider} = Layout
    return (
        <Sider className="left-nav">
          <a className="left-nav-header" href="/home">
            <img src={logo} alt="图片无法加载"/>
            <span>郑工后台</span>
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