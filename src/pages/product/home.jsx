import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {Card,Button,Icon,Input,Select,Table,message} from "antd"
import throttle from 'lodash.throttle'

import {reqGetProducts,reqPutaway,reqSearch} from "../../api"

//每页显示个数
const pageSize=4
export default class ProductHome extends Component{
  state={
    searchType:"productName",
    searchName:"",
    total:0,
    loading:false,
    date:[]}
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
      width:100,
      render:(price)=><span>￥{price}</span>
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
      width:150,
      render:()=>{
        return (<div>
          <Link to="/product/details">详情</Link>&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/product/AddUpdatePro">修改</Link>
        </div>)
      }
    }
  ]


  //修改商品上下架
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
    let result
    this.setState({loading:true})
    //根据输入搜索信息查找商品
    if(this.isSearch){
      const searchMessage={
        pageNum,
        pageSize,
        searchType:this.state.searchType,
        searchName:this.state.searchName
      }
      result=await reqSearch(searchMessage)
    }else{
      //直接查找
      result=await reqGetProducts(pageNum,pageSize)
    }
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
    const {date,loading,total,searchType}=this.state
    const {Option}=Select
    const title=(
      <span>
        <Select
          style={{width:200}}
          value={searchType} 
          onChange={value=>this.setState({searchType:value})}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          placeholder="关键字"
          style={{width:200,margin:"0 10px"}}
          onChange={event=>this.setState({searchName:event.target.value})}
        />
        <Button type="primary" onClick={
          ()=>{
            this.isSearch=true
            this.getProducts(1)
            }
          }>
          搜索
        </Button>
      </span>
    )
    const extra=(<Button type="primary" onClick={()=>{
      }}>
      <Icon type="plus"/>
      添加商品
    </Button>)
   
    return (
      <Card title={title} extra={extra} style={{ width: "100%" }}>
      <Table
          columns={this.columns}
          dataSource={date}
          bordered
          loading={loading}
          rowKey="_id"
          pagination={{
            defaultPageSize:pageSize, 
            showQuickJumper: true,
            total,
            onChange:this.getProducts}}
        />
    </Card>
    )
  }
}
 