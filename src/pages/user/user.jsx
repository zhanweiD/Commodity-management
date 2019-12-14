import React, { Component } from 'react'
import {Card,Button,Table,Modal, message} from "antd"

import {formateDate} from "../../utils/dateUtils"
import {reqGetUsers,reqGetRoles,reqRemoveUser,reqAddUser,reqUpdateUser} from "../../api"
import AddUuserForm from "./add-update-user"
import LinkButton from "../../components/link-button/linkButton"

const pageSize=6
export default class User extends Component{
  state={
    data:[],
    visible: false,
    roles:{},
    loading:false
  }
  columns=[
    {
      title:"用户名",
      width:100,
      dataIndex:"username"
    },
    { 
      title:"邮箱",
      dataIndex:"email",
    },
    { 
      title:"电话",
      dataIndex:"phone",
    },
    { 
      title:"注册时间",
      dataIndex:"create_time",
      render:formateDate
    },
    {
      title:"所属角色",
      dataIndex:"role_id",
      render:(role_id)=>this.state.roles[role_id]
    },
    {
      title:"操作",
      colSpan:2,
      render:(user)=>{
        return (
            <LinkButton onClick={()=>{
              this.user=user
              this.showModal()
            }}>修改</LinkButton>
        )
      }
    },
    {
      title:"操作",
      colSpan:0,
      render:(user)=>{
        return <LinkButton onClick={()=>this.showConfirm(user)}>删除</LinkButton>
      }
    }
  ]

  //确认删除对话框
  showConfirm=(user)=> {
    Modal.confirm({
      title: `你确定删除${user.username}用户吗?`,
      onOk:()=> {
        this.removeUser(user._id)
      },
      // onCancel:()=> {
      // },
    });
  }
  //删除用户
  removeUser=async(userId)=>{
    const result=await reqRemoveUser(userId)
    if(result.status===0){
      message.success("用户删除成功")
      this.getUsers()
    }else{
      message.error("用户删除失败")
    }
  }
  //获取角色列表
  getRoles=async()=>{
    const result = await reqGetRoles()
    if(result.status===0){
      this.roles=result.data
      const roles=result.data.reduce((pre,item)=>{
        pre[item._id]=item.name
        return pre
      },{})
      this.setState({roles})
    }
  }
  //获取所有用户
  getUsers=async()=>{
    this.setState({loading:true})
    const result = await reqGetUsers()
    this.setState({loading:false})
    if(result.status===0){
      this.setState({data:result.data.users})
    }
  }
  //添加或者更新用户
  addUpdateUser=async(user)=>{
    let result
    if(this.user){
      user._id=this.user._id
      result=await reqUpdateUser(user)
    }else{
      result=await reqAddUser(user)
    }
    if(result.status===0){
      message.success(this.user?"更新成功":"添加成功")
      this.getUsers()
    }else{
      message.error(this.user?"更新失败":"添加失败")
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = e => {
    this.handleSumbit()
    this.form.resetFields()
    this.setState({
      visible: false,
    })
  }

  handleCancel = e => {
    this.form.resetFields()
    this.setState({
      visible: false,
    })
  }

  //获取子组件的form
  setForm=(form)=>this.form=form
  //表单数据验证收集
  handleSumbit=()=>{
    this.form.validateFields((err,values)=>{
      if(!err){
        this.addUpdateUser(values)
      }
    })
  }

  componentDidMount(){
    this.getUsers()
    this.getRoles()
  }
  render() {
    const {data,loading}=this.state
    const title=(
      <Button type="primary" onClick={()=>{
        this.showModal()
        this.user=""
      }}>
        添加用户
      </Button>
    )
    return (
     <Card title={title}>
       <Table
         columns={this.columns}//字段
         dataSource={data}//数据源，数组
         bordered//边框
         rowKey="_id"//每个数据的唯一标识
         loading={loading}
         pagination={{ defaultPageSize: pageSize, showQuickJumper: true}}
       />
       <Modal
          title={this.user?"修改用户":"添加用户"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddUuserForm setForm={this.setForm} roles={this.roles} user={this.user}/>
        </Modal>
     </Card>
    )
  }
}

 