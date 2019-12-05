import React from "react"
import {Redirect} from "react-router-dom"
import { Layout } from 'antd'

import LeftNav from "../../components/leftNav/leftNav"
import memoryUtils from "../../utils/memoryUtils"
import "./admin.less"

export default class Admin extends React.Component{
  render(){
    if(!memoryUtils.user){
      return <Redirect to="/login"/>
    }

    const { Header, Footer, Content } = Layout
    return(
      <Layout className="layout" style={{height:"100%"}}>
        <LeftNav/>
        <Layout>
          <Header className="layout-header">Header</Header>
          <Content className="layout-content">Content</Content>
          <Footer>Footer</Footer>
        </Layout>
    </Layout>
    )
  }
}