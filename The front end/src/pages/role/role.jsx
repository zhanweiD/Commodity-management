import React, { Component } from 'react'
import {Card,Button,Table, message,Modal} from "antd"

import {formateDate} from "../../utils/dateUtils"
import UpdateRole from "./update-role"
import AddRole from "./add-role"
import {reqGetRoles,reqAddRole,reqRemoveRole,reqUpdataRole} from "../../api"
import memoryUtils from "../../utils/memoryUtils"
import LinkButton from "../../components/link-button/linkButton"

const pageSize=6
export default class Role extends Component{

  updateMenus=React.createRef()
  state={
    date:[],         //表格数据源
    loading:false,   //是否加载
    addRole:false,   //是否显示添加对话框
    updateRole:false //是否显示设置权限对话框
  }

  //表格字段设置
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
      render:formateDate
    },
    {
      title: '授权时间',
      width:250,
      dataIndex: 'auth_time',
      render:formateDate
    },
    {
      title: '授权人',
      width:150,
      dataIndex: 'auth_name'
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
            <LinkButton
              onClick={()=>{
                this.showConfirm(role)
              }}>删除角色</LinkButton>
          </span>
        )
      }
    }
  ]

  //更新角色权限
  updataRole=async(role)=>{
    const result = await reqUpdataRole(role)
    if(result.status===0){
      message.success("权限设置成功")
      this.role=result.data
      this.getRoles()
    }else{
      message.error(result.msg)
    }
  }

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
  //是否删除对话框
  showConfirm=(role)=> {
    Modal.confirm({
      title: `你确定删除${role.name}角色吗?`,
      onOk:()=> {
        this.removeRole(role._id)
      },
      // onCancel:()=> {
      // },
    });
  }

  //获取角色列表
  getRoles=async()=>{
    this.setState({loading:true})
    const result = await reqGetRoles()
    this.setState({loading:false})
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
  //点击添加OK后的回调
  handleOk=()=>{
    this.handleSumbit()
    this.form.resetFields()
  }
  //点击取消后的回调
  handleCancel=()=>{
    this.setState({addRole:false})
    this.form.resetFields()
  }
  //权限设置点击确认回调
  updateRoleOk=()=>{
    const role={
      _id:this.role._id,
      menus:this.updateMenus.current.setMenus(),
      auth_time:Date.now(),
      auth_name:memoryUtils.user.username
    }
    this.updataRole(role)
    this.setState({updateRole:false})
  }
  //权限设置取消回调
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
          visible={addRole}  //是否可见
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
          <UpdateRole ref={this.updateMenus} role={this.role}/>
        </Modal>
     </Card>
    )
  }
}
 