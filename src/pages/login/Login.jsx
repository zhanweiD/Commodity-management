import React from "react"
import { Form, Icon, Input, Button,message} from 'antd';
import {Redirect} from "react-router-dom"

import {saveUser} from "../../utils/localStorageUtils"
import memoryUtils from "../../utils/memoryUtils"
import {reqLogin} from "../../api"
import logo from "./images/logo.png"
import "./login.less"
class Login extends React.Component{
    //自定义密码验证规则
    calidatepwd=(rule, value, callback)=>{
        value=value.trim()
        if(!value){
            callback("请输入密码")
        }else if(value.length<4){
            callback("密码不能小于4位")
        }else if(value.length>12){
            callback("密码不能大于12位")
        }else if(!/[a-zA-Z0-9_]/.test(value)){
            callback("密码为数字字母下划线")
        }else{
            callback()
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        //点击登录，对数据进行统一验证
        this.props.form.validateFields(async(err, values) => {
          if (!err) {
            //如果没有错误，发送ajax登录请求
            const result=await reqLogin(values)
            //如果返回状态为0，则登陆成功，
            if(result.status===0){
                const user=result.data
                //将用户写入local和内存
                saveUser(user)
                memoryUtils.user = user
                this.props.history.replace('/')
                message.success("登录成功")
            }else{
                message.error("用户名或密码错误，请重新输入")
            }
          }
        });
      };
    render(){
        //判断是否已经登录过
        if(memoryUtils.user){
            return <Redirect to="/"/>
        }
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="图片暂时无法加载"/>
                    <h1>后台管理系统</h1>
                </header>
                <div className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {/* 使用声明式验证验证用户名信息 */}
                        {getFieldDecorator("username",{
                            initialValue: '',          //初始值
                           rules: [
                               { required: true, message: '请输入用户名' },
                               {min:4,message:"用户名不小于4位"},
                               {max:12,message:"用户名不能大于12位"},
                               {pattern:/[a-zA-Z0-9_]/,message:"用户名为数字字母下划线"}
                            ]
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                            />
                        )}
                        </Form.Item>
                        <Form.Item>
                        {/* 使用自定义验证验证密码信息 */}
                        {getFieldDecorator("password",{
                           initialValue: '',          //初始值    
                           rules: [
                               {validator:this.calidatepwd}
                            ]
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            />
                        )}
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
//包装login组件，向其传入form参数
const WrapLoginForm = Form.create()(Login);
export default WrapLoginForm