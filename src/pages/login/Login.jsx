import React from "react"
import { Form, Icon, Input, Button} from 'antd';

import logo from "./images/logo.png"
import "./login.less"
class Login extends React.Component{
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
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('发送Ajax请求', values);
          }
        });
      };
    render(){
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
const WrapLoginForm = Form.create()(Login);
export default WrapLoginForm