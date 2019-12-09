import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {Card,Button,Icon,Form,Input,Select,Table,message} from "antd"
import throttle from 'lodash.throttle'

import {reqGetProducts,reqPutaway} from "../../api"

class ProductHome extends Component{
  state={status:false,total:0,loading:false,
    date:[]
  }
  columns=[
    {
      title: '商品名称',
      width:200,
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
      width:100
    },
    {
      title: '状态',
      width:150,
      render:({_id,status})=>{
        return (
            <div>
              <span>{status===1? "在售":"已下架"}</span>&nbsp;&nbsp;
              <Button onClick={()=>{this.updatePutaway(_id,status)}}>{status===1? "下架":"上架"}</Button>
            </div>
        )
      }
    },
    {
      title: '操作',
      width:100,
      render:()=>{
        return (<div>
          <Link to="/product/details">详情</Link><br/>
          <Link to="/product/AddUpdatePro">修改</Link>
        </div>)
      }
    }
  ]
  //更新商品上下架
  updatePutaway=throttle(async(productId,status)=>{
    status=status===1? 2:1
    const result = await reqPutaway(productId,status)
    if(result.status===0){
      message.success("商品状态更新成功")
      this.getProducts(this.pageNum)
    }
  },2000)
  //获取商品列表
  getProducts=async(pageNum)=>{
    this.pageNum=pageNum
    this.setState({loading:true})
    const result=await reqGetProducts(pageNum,4)
    this.setState({loading:false})
    if(result.status===0){
      const {list,total}=result.data
      this.setState({date:list,total})
    }else{
      message.error("分类列表获取失败")
    }
  }
  componentDidMount(){
    this.getProducts(1)
  }
  render() {
    const {date,loading,total}=this.state
    const {Option}=Select
    const {getFieldDecorator}=this.props.form
    const extra=(<Button type="primary" onClick={()=>{
      }}>
      <Icon type="plus"/>
      添加商品
    </Button>)
    const title=(
      <Form layout="inline"  onSubmit={this.handleSubmit}>
        <Form.Item >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请选择搜索方式' }],
          })(
            <Select
            style={{width:200}}
            
            onChange={this.handleSelectChange}
          >
            <Option value="an">按名称搜索</Option>
            <Option value="female">按描述搜索</Option>
          </Select>,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('keyWord', {
            rules: [{ required: true, message: '请输入关键字' }],
          })(
            <Input
              placeholder="关键字"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Form>
    )
    return (
      <Card title={title} extra={extra} style={{ width: "100%" }}>
      <Table
          columns={this.columns}
          dataSource={date}
          bordered
          loading={loading}
          rowKey="_id"
          pagination={{ defaultPageSize:4, showQuickJumper: true,total,onChange:this.getProducts}}
        />
    </Card>
    )
  }
}
export default Form.create()(ProductHome)
 