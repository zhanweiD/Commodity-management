import React, { Component } from 'react'
import {Card,Icon,List} from "antd"

import {reqGetClassify} from "../../api"
import LinkButton from "../../components/link-button/linkButton"
import memoryUtils from "../../utils/memoryUtils"
//,reqProduct
const {Item}=List
export default class Details extends Component{
  state={
    product:memoryUtils.product,
    categoryName:""
  }
  //获取商品分类名称
  getDetails=async(categoryId)=>{
    console.log(categoryId)
    const result=await reqGetClassify(categoryId)
    if(result.status===0){
      console.log(result)
      this.setState({categoryName:result.data.name})
    }
  }
  // async componentDidMount () {
  //   let product = this.state.product
  //   if (product._id) { // 如果商品有数据, 获取对应的分类
  //     this.getDetails(product.categoryId)
  //   } else { // 如果当前product状态没有数据, 根据id参数中请求获取商品并更新
  //     const id = this.props.match.params.id
  //     console.log(this.props.match.params)
  //     const result = await reqProduct(id)
  //     if (result.status === 0) {
  //       product = result.data
  //       this.setState({
  //         product
  //       })
  //       this.getDetails(product.categoryId) // 获取对应的分类
  //     }
  //   }
  // }
  根据商品分类ID获取分类名称
  componentDidMount(){
    if(memoryUtils.product.categoryId){
      this.getDetails(memoryUtils.product.categoryId)
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
       <List>
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
           <div dangerouslySetInnerHTML={{ __html: product.detail}}></div>
         </Item>
       </List>
     </Card>
    )
  }
}
 