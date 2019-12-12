import React, { Component } from 'react'
import { Card,Button,Icon,Table,message,Modal } from 'antd'

import memoryUtils from "../../utils/memoryUtils"
import AddUpdateModel from "./addUpdateModel"
import LinkButton from "../../components/link-button/linkButton"
import {reqCategorys,reqAddCategory,reqUpdataCategory} from "../../api" 

export default class Category extends Component{
  state={categorys:[],visible:0,loading:false}

  columns = [
    {
      title: '分类',
      dataIndex: 'name',
    },
    {
      title: '操作',
      width:"25%",
      render:(category) => <LinkButton onClick={()=>{
        this.category=category  //保存当前点击信息
        this.setState({visible:2})
      }}>
        修改分类</LinkButton>
    }
  ]
  //setForm从子组件获取form
  setForm =(form)=>{
    this.form=form
  }
  //验证表单获取数据
  handleSubmit = () => {
    this.form.validateFields((err, values) => {
      if (!err) {
        if(this.state.visible===1){
          this.addCategory(values.username)
        }else{
          this.updateCategory(values.username)
        } 
      }else{
        message.error("添加失败")
      }
    });
  };

  //显示输入框
  handleOk=()=>{
    this.handleSubmit()
    this.setState({visible:0})
    this.form.resetFields()
  }
  //隐藏输入框
  handleCancel=()=>{
    this.form.resetFields()
    this.setState({visible:0})
  }
  
  //获取分类信息
  getCategorys=async()=>{
    this.setState({loading:true})
    const result=await reqCategorys()
    this.setState({loading:false})
    if(result.status===0){
      console.log(result)
      this.setState({categorys:result.data})
      memoryUtils.categorys=result.data
    }else{
      message.error("分类信息获取失败")
    }
  }  
  //添加分类信息
  addCategory = async (categoryName)=>{
    const result=await reqAddCategory(categoryName)
    if(result.status===0){
      message.success("添加成功")
      this.getCategorys()
    }else{
      message.error("添加失败")
    }
  }
  //修改分类信息
  updateCategory=async(categoryName)=>{
    const {_id,name}=this.category
    //没有修改直接返回
    if(name===categoryName){
      return
    }
    const result = await reqUpdataCategory(_id,categoryName)
    //修改后重新刷新
    if(result.status===0){
      this.getCategorys()
      message.success("修改成功")
    }else{
      message.error("修改失败")
    }
  }
  //渲染前加载出分类信息
  componentDidMount(){
    this.getCategorys()
  }
  render() {
    const {loading,categorys,visible}=this.state
    //避免为点击之前category为undefined，读取属性报错
    const category=this.category||{}
    //visible为0隐藏form，1显示添加form，2显示修改form
    const extra=( 
      <Button type="primary" onClick={()=>{
        this.category={}
        this.setState({visible:1})}}>
        <Icon type="plus"/>
        添加
      </Button>)
    return (
      <Card extra={extra}>
        {/* 表格 */}
        <Table
          columns={this.columns}
          dataSource={categorys}
          bordered
          loading={loading}
          rowKey="_id"
          pagination={{ defaultPageSize: 6, showQuickJumper: true}}
        />
        {/* form表单 */}
        <Modal
          title={visible===1? "添加分类":"修改分类"}
          visible={visible!==0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddUpdateModel category={category.name} setForm={this.setForm}/>
        </Modal>
      </Card>
    )
  }
}
 
 

