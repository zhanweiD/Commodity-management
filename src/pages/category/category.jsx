import React, { Component } from 'react'
import { Card,Button,Icon,Table,message } from 'antd'

import LinkButton from "../../components/link-button/linkButton"
import {reqCategorys} from "../../api" 
const columns = [
  {
    title: '分类',
    dataIndex: 'name',
    render: text =>{return <a href="#1">{text}</a>}
  },
  {
    title: '操作',
    width:"30%",
    render:(category) => <LinkButton onClick={() => {
      // this.category = category // 保存当前分类, 其它地方都可以读取到
      // this.setState({ showStatus: 2})
    }}>修改分类</LinkButton>
  },
];
export default class Category extends Component{
  state={categorys:[]}
  constructor(){
    super()
    this.getCategorys()
  }
  getCategorys=async()=>{
    const result=await reqCategorys()
    if(result.status===0){
      this.setState({categorys:result.data})
    }else{
      message.error("分类信息获取失败")
    }

  }
  render() {
    return (
      <Card extra={
        <Button type="primary">
          <Icon type="plus"/>
          添加
        </Button>
      }>
        <Table
          columns={columns}
          dataSource={this.state.categorys}
          bordered
          rowKey="_id"
          pagination={{ defaultPageSize: 6, showQuickJumper: true}}
        />
    </Card>
    )
  }
}
 
 

