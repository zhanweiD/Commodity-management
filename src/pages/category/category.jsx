import React, { Component } from 'react'
import { Card,Button,Icon,Table } from 'antd'

// import LinkButton from "../../components/link-button/linkButton"
const columns = [
  {
    title: '分类',
    dataIndex: 'name',
    render: text =>{return <a href="#1">{text}</a>}
  },
  {
    title: '操作',
    className: 'column-money' ,
    width:"30%",
    dataIndex: 'money',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];
export default class Category extends Component{
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
          dataSource={data}
          bordered
          pagination={{ defaultPageSize: 2, showQuickJumper: true}}
        />
    </Card>
    )
  }
}
 
 

