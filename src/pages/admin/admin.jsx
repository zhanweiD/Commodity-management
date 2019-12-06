import React from "react"
import {Redirect,Switch,Route} from "react-router-dom"
import { Layout } from 'antd'

import LeftNav from "../../components/leftNav/leftNav"
import memoryUtils from "../../utils/memoryUtils"
import "./admin.less"

import Header from "../../components/herder/herder"
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


export default class Admin extends React.Component{
  render(){
    //空对象是true，
    if(!memoryUtils.user._id){
      return <Redirect to="/login"/>
    }

    const {Footer, Content} = Layout
    return(
      <Layout className="layout">
        <LeftNav/>
        <Layout>
          <Header/>
          <Content className="layout-content">
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path='/category' component={Category} />
                <Route path='/product' component={Product} />
                <Route path='/role' component={Role} />
                <Route path='/user' component={User} />
                <Route path='/charts/bar' component={Bar} />
                <Route path='/charts/line' component={Line} />
                <Route path='/charts/pie' component={Pie} />
                <Redirect to="/home"/>
            </Switch>
          </Content>
          <Footer className="layout-content-footer">推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
    </Layout>
    )
  }
}