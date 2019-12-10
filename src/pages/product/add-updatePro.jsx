import React from "react"
import {
  Form,
  Input,
  Card,
  // Tooltip,
  Icon,
  // Cascader,
  Select,
  // Row,
  // Col,
  // Checkbox,
  Button,
  // AutoComplete,
} from 'antd';

import LinkButton from "../../components/link-button/linkButton"
const { Option } = Select;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  }

  handleSubmit = e => {
    e.preventDefault();
    
  }

  handleConfirmBlur = e => {
   
  }
  render() {
    const {getFieldDecorator}=this.props.form
    const {Item}=Form
    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" />
        </LinkButton>
        <span>添加商品</span>
      </span>
    )
    return (
      <Card title={title}>
        <Form {...formLayout} onSubmit={this.handleSubmit} className="product-addUpdate">
          <Item label="商品名称">
            {getFieldDecorator("name",{
              rules:[
                { required:true,message:"商品名称不能为空"}
              ],
            })(
              <Input placeholder="商品名称"/>
            )}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("describe",{
              rules:[
                { required:true,message:"商品描述不能为空"}
              ],
            })(
              <Input placeholder="商品描述"/>
            )}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator("price",{
              rules:[
                { required:true,message:"商品价格不能为空"}
              ],
            })(
              <Input type="number" placeholder="商品价格" addonAfter="元"/>
            )}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator("price",{
              initialValue:'',
              rules:[
                { required:true,message:"请选择商品分类"}
              ],
            })(
              <Select>
              <Option value=''>未选择</Option>
            </Select>
            )}
          </Item>
          <Item label="商品图片">
            <Select>
              <Option value=''>未选择</Option>
            </Select>
          </Item>
          <Item label="商品详情">
            <Select>
              <Option value=''>未选择</Option>
            </Select>
          </Item>
          <Button type="primary">提交</Button>
        </Form>
      </Card>
    );
  }
}

export default Form.create({ name: 'register' })(RegistrationForm);