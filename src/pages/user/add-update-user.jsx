import React from "react"
import { Form,Input,Select } from 'antd';

// import {reqGetRoles} from "../../api"

const {Item}=Form
const {Option}=Select
class AddUserForm extends React.Component {
  state = {
    roles:[],
    rolesName:{}
  };

  
  //根据角色列表创建Option
  // createOption=(roles)=>{
  //   return roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
  // }
  createOption=(roles)=>{
      return roles.reduce((pre,item)=>{
      pre.push(<Option key={item._id} value={item._id}>{item.name}</Option>)
      return pre
    },[])
  }
  
  componentDidMount(){
    const rolesName=this.props.roles.reduce((pre,item)=>{
      pre[item._id]=item.name
      return pre
    },{})   
    this.setState({rolesName}) 
  }
  render() {
    const {rolesName}=this.state
    const {roles,user,setForm}=this.props
    setForm(this.props.form)
    const {getFieldDecorator}=this.props.form
    const formItemLayout={
      labelCol:{span:4},
      wrapperCol:{span:15}
    }
    return (
      <Form {...formItemLayout}>
        <Item label="用户名：">
          {getFieldDecorator("username",{
            initialValue:user.username||"",
            rules:[{required:true,message:"用户名不能为空"}]
          })(<Input/>)}
        </Item>
        <Item label="密码：" style={{display:this.props.user?"none":"block"}}>
          {getFieldDecorator("password",{
            initialValue:user.password||"",
            rules:[{required:true,message:"密码不能为空"}]
          })(<Input/>)}
        </Item>
        <Item label="手机号">
          {getFieldDecorator("phone",{
            initialValue:user.phone||"",
            rules:[{required:true,message:"手机号不能为空"},
              {pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                message:"请输入正确的手机号"}
            ]
          })(<Input/>)}
        </Item>
        <Item label="邮箱">
          {getFieldDecorator("email",{
            initialValue:user.email||"",
            rules:[{required:true,message:"邮箱不能为空"},
              {pattern:/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
              message:"请输入正确邮箱地址"}
            ]
          })(<Input/>)}
        </Item>
        <Item label="职位">
          {getFieldDecorator("role_id",{
            initialValue:rolesName[user.role_id]||"",
            rules:[{required:true,message:"请选择职位"}]
          })(
            <Select
            >
              <Option value="">请选择</Option>
              {roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)}
              {/* {this.createOption(roles)} */}
              {/* 下面这种方式不行，无法渲染，不知原因，在update-role中能用 */}
              {/* {this.options} */}
            </Select>
          )}
        </Item>
      </Form>
    );
  }
}
export default Form.create()(AddUserForm)