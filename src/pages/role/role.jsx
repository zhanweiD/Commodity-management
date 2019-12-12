import React, { Component } from 'react'
import {Card,Button,Table, message,Modal} from "antd"

import UpdateRole from "./update-role"
import AddRole from "./add-role"
import {reqGetRoles,reqAddRole,reqRemoveRole} from "../../api"
import memoryUtils from "../../utils/memoryUtils"
import LinkButton from "../../components/link-button/linkButton"

const pageSize=6
export default class Role extends Component{

  state={
    date:[],
    loading:false,
    addRole:false,
    updateRole:false
  }

  columns=[
    {
      title: '角色名称',
      width:150,
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      width:250,
      dataIndex: 'create_time',
    },
    {
      title: '授权时间',
      width:250,
      dataIndex: 'auth_time',
    },
    {
      title: '授权人',
      width:150,
      render:()=>memoryUtils.user.username
    },
    {
      title: '操作',
      width:200,
      render:(role)=>{
        return (
          <span>
            <LinkButton 
            onClick={()=>{
              this.setState({updateRole:true})
              this.role=role
            }}>权限设置</LinkButton>&nbsp;&nbsp;
            <LinkButton onClick={()=>this.removeRole(role._id)}>删除角色</LinkButton>
          </span>
        )
      }
    }
  ]

  //修改角色权限

  //删除指定角色
  removeRole=async(roleId)=>{
    const result=await reqRemoveRole(roleId)
    if(result.status===0){
      message.success("角色删除成功")
      this.getRoles()
    }else{
      message.error(result.msg)
    }
  }

  //获取角色列表
  getRoles=async()=>{
    const result = await reqGetRoles()
    if(result.status===0){
      this.setState({date:result.data})
    }
  }

  //添加角色
  AddRole=async(roleName)=>{
    const result = await reqAddRole(roleName)
    if(result.status===0){
      message.success("角色添加成功")
      this.getRoles()
    }else{
      message.error("角色添加失败")
    }
  }

  //获取子组件的form
  setForm=(form)=>{
    this.form=form
  }
  //验证form表单
  handleSumbit=()=>{
    this.form.validateFields((err,values)=>{
      if(!err){
        this.AddRole(values.rolename)
        this.setState({addRole:false})
      }
    })
  }
  handleOk=()=>{
    this.handleSumbit()
    this.form.resetFields()
  }
  handleCancel=()=>{
    this.setState({addRole:false})
    this.form.resetFields()
  }
  updateRoleOk=()=>{
    this.setState({updateRole:false})
  }
  updateRoleCancel=()=>{
    this.setState({updateRole:false})
  }
  componentDidMount(){
    this.getRoles()
  }

  render() {
    const {date,loading,addRole,updateRole}=this.state
    const title=(<Button
      type="primary"
      onClick={()=>this.setState({addRole:true})}
    >添加角色</Button>)

    return (
     <Card title={title}>
       <Table
         columns={this.columns}//字段
         dataSource={date}//数据源，数组
         bordered//边框
         loading={loading}//加载状态
         rowKey="_id"//每个数据的唯一标识
         pagination={{ defaultPageSize: pageSize, showQuickJumper: true}}
       />
       <Modal
          title="创建角色"
          visible={addRole}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddRole setForm={this.setForm}/>
        </Modal>
        <Modal
          title="设置角色权限"
          visible={updateRole}
          onOk={this.updateRoleOk}
          onCancel={this.updateRoleCancel}
        >
          {/* setForm={this.setForm} */}
          <UpdateRole role={this.role}/>
        </Modal>
      
     </Card>
    )
  }
}
 