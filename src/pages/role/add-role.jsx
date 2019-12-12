import React from "react"
import { Form,Input } from 'antd'

class AddRole extends React.Component{
  render(){
    const {setForm}=this.props
    setForm(this.props.form)
    const {getFieldDecorator}=this.props.form
    return(
      <Form>
        <Form.Item label="角色名称">
          {getFieldDecorator('rolename', {
            rules: [{ required: true, message: '请输入角色名称' },
              {pattern:/[\u4e00-\u9fa5]/gm,message:"请输入中文字符名称"}
            ],
          })(
            <Input
              placeholder="请输入角色名称"
            />
          )}
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(AddRole)
