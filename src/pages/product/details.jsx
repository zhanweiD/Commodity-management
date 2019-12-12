import React, { Component } from 'react'
import {Card,Icon,List} from "antd"

import {reqGetClassify,reqProduct} from "../../api"
import LinkButton from "../../components/link-button/linkButton"
import memoryUtils from "../../utils/memoryUtils"

const {Item}=List
export default class Details extends Component{
  state={
    product:memoryUtils.product,
    categoryName:""
  }
  //根据商品ID获取商品信息
  getProduct=async(productId)=>{
    const result=await reqProduct(productId)
    if(result.status===0){
      const product=result.data
      this.setState({product})
      this.getDetails(product.categoryId)
    }
  }
  //根据分类ID获取商品分类名称
  getDetails=async(categoryId)=>{
    const result=await reqGetClassify(categoryId)
    if(result.status===0){
      this.setState({categoryName:result.data.name})
    }
  }

  componentDidMount(){
    let {product}=this.state
    if(product.categoryId){
      this.getDetails(product.categoryId)
    }else{
      const productId=this.props.match.params.id
      this.getProduct(productId)
    }
  }
  render() {
    const {product,categoryName}=this.state
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
     <Card title={title}>
       <List className="detail">
         <Item>
           <span>商品名称:</span>
           <span>{product.name}</span>
         </Item>
         <Item>
           <span>商品描述:</span>
           <span>{product.desc}</span>
         </Item>
         <Item>
           <span>商品价格:</span>
           <span>{product.price}元</span>
         </Item>
         <Item>
           <span>商品分类:</span>
           <span>{categoryName}</span>
         </Item>
         <Item>
           <span>商品图片:</span>
           <span>{product.imgs && product.imgs.map(img => <img className="detail-img" key={img} src={"http://localhost:5000/upload/" + img} alt="img" />)}</span>
         </Item>
         <Item>
           <span>商品详情:</span>
           <span dangerouslySetInnerHTML={{ __html: product.detail}} className="detail-detail"></span>
         </Item>
       </List>
     </Card>
    )
  }
}
 