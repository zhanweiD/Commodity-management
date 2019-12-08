import React from "react"
import { Form,Input } from 'antd'

class AddUpdateModel extends React.Component{
  render(){
    const {setForm,category}=this.props
    setForm(this.props.form)
    const {getFieldDecorator}=this.props.form
    return(
      <Form>
        <Form.Item>
          {getFieldDecorator('username', {
            initialValue:category||"",
            rules: [{ required: true, message: '请输入分类名称' },
              {pattern:/[\u4e00-\u9fa5]/gm,message:"请输入中文字符名称"}
            ],
          })(
            <Input
              placeholder="请输入分类名称"
            />
          )}
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(AddUpdateModel)
