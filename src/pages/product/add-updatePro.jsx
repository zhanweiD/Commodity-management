import React from "react"
import {
  Form,
  Input,
  Card,
  Icon,
  Select,
  Button,
  message
} from 'antd';

import RichTextEditor from "./rich-text-editor"
import PicturesWall from "./picture-wall"
import memoryUtils from "../../utils/memoryUtils"
import {reqCategorys,reqAddProduct,reqUpdateProduct} from "../../api"
import LinkButton from "../../components/link-button/linkButton"

const { Option } = Select;

class RegistrationForm extends React.Component {
  state = {
    categorys: [],
  }
  constructor(){
    super()
    this.product=memoryUtils.product
    this.isUpdate=!!this.product._id
  }
  picturesRef=React.createRef()
  editorRef=React.createRef()

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields(async(err,values)=>{
      if(!err){
        let result
        //收集商品图片imgs数组和富文本信息并添加为values的属性
        values.imgs=this.picturesRef.current.getImgs()
        values.detail=this.editorRef.current.getDetail()
        //判断是修改还是添加
        if(this.isUpdate){
          values._id=this.product._id
          result=await reqUpdateProduct(values)
        }else{
          result=await reqAddProduct(values)
        }
        if(result.status===0){
          message.success(this.isUpdate?"商品信息修改成功":"商品添加成功")
          this.props.history.replace("/product")

        }else{
          message.error(this.isUpdate?"商品信息修改失败":"商品添加失败")
        }
      }
    })
  }
  
  //自定义价格验证
  validatorPrice=(rule, value, callback)=>{
    if(value<=0){
      callback("商品价格必须大于0")
    }else{
      callback()
    }
  }
  //获取分类列表
  getCategorys=async()=>{
    const result=await reqCategorys()
    if(result.status===0){
      this.setState({categorys:result.data})
    }
  }
  componentDidMount(){
    this.getCategorys()
  }
  render() {
    const {product}=this
    const {categorys}=this.state
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
        <span>{this.isUpdate?"修改商品":"添加商品"}</span>
      </span>
    )
    return (
      <Card title={title}>
        <Form {...formLayout} onSubmit={this.handleSubmit} className="product-addUpdate">
          <Item label="商品名称">
            {getFieldDecorator("name",{
              initialValue:product.name,
              rules:[
                { required:true,message:"商品名称不能为空"}
              ],
            })(
              <Input placeholder="商品名称"/>
            )}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("desc",{
              initialValue:product.desc,
              rules:[
                { required:true,message:"商品描述不能为空"}
              ],
            })(
              <Input placeholder="商品描述"/>
            )}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator("price",{
              initialValue:product.price,
              rules:[
                {required:true,message:"商品价格不能为空"},
                {validator:this.validatorPrice}
              ],
            })(
              <Input type="number" placeholder="商品价格" addonAfter="元"/>
            )}
          </Item>
          <Item label="商品分类">
            {getFieldDecorator("categoryId",{
              initialValue:product.categoryId||"",
              rules:[
                { required:true,message:"请选择商品分类"}
              ],
            })(
              <Select>
                <Option value=''>未选择</Option>
                {categorys.map(item=><Option value={item._id} key={item._id}>{item.name}</Option>)}
            </Select>
            )}
          </Item>
          <Item label="商品图片">
            <PicturesWall ref={this.picturesRef} imgs={product.imgs}/>
          </Item>
          <Item label="商品详情" wrapperCol={{ span: 20 }}>
              <RichTextEditor ref={this.editorRef} detail={product.detail}/>
          </Item>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(RegistrationForm);