import React, { Component } from 'react'
import {Card,Button,Icon,Form,Input,Select,Table} from "antd"

class Product extends Component{
  state={status:"false",
    date:[{
      "status": 1,
      "imgs": [
          "image-1559402396338.jpg"
      ],
      "_id": "5ca9e05db49ef916541160cd",
      "name": "联想ThinkPad 翼4809",
      "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
      "price": 65999,
      "categoryId": "5ca9db9fb49ef916541160cc",
      "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
      "__v": 0
  },
  {
      "status": 1,
      "imgs": [
          "image-1559402448049.jpg",
          "image-1559402450480.jpg"
      ],
      "_id": "5ca9e414b49ef916541160ce",
      "name": "华硕(ASUS) 飞行堡垒",
      "desc": "15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)",
      "price": 6799,
      "categoryId": "5ca9db8ab49ef916541160cb",
      "detail": "<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">华硕(ASUS) 飞行堡垒6 15.6英寸窄边框游戏笔记本电脑(i7-8750H 8G 256GSSD+1T GTX1050Ti 4G IPS)火陨红黑</span>&nbsp;</p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">【4.6-4.7号华硕集体放价，大牌够品质！】1T+256G高速存储组合！超窄边框视野无阻，强劲散热一键启动！</span>&nbsp;</p>\n",
      "__v": 0
  },
  {
      "status": 2,
      "imgs": [
          "image-1559402436395.jpg"
      ],
      "_id": "5ca9e4b7b49ef916541160cf",
      "name": "你不知道的JS（上卷）",
      "desc": "图灵程序设计丛书： [You Don't Know JS:Scope & Closures] JavaScript开发经典入门图书 打通JavaScript的任督二脉",
      "price": 35,
      "categoryId": "5ca9d6c9b49ef916541160bc",
      "detail": "<p style=\"text-align:start;\"><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">图灵程序设计丛书：你不知道的JavaScript（上卷）</span> <span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\"><strong>[You Don't Know JS:Scope &amp; Closures]</strong></span></p>\n<p style=\"text-align:start;\"><span style=\"color: rgb(227,57,60);background-color: rgb(255,255,255);font-size: 12px;\">JavaScript开发经典入门图书 打通JavaScript的任督二脉 领略语言内部的绝美风光</span>&nbsp;</p>\n",
      "__v": 0
  },
  {
      "status": 2,
      "imgs": [
          "image-1554638240202.jpg"
      ],
      "_id": "5ca9e5bbb49ef916541160d0",
      "name": "美的(Midea) 213升-BCD-213TM",
      "desc": "爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护",
      "price": 1388,
      "categoryId": "5ca9d9cfb49ef916541160c4",
      "detail": "<p style=\"text-align:start;\"><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;font-family: Arial, \"microsoft yahei;\">美的(Midea) 213升 节能静音家用三门小冰箱 阳光米 BCD-213TM(E)</span></p>\n<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;font-family: tahoma, arial, \"Microsoft YaHei\", \"Hiragino Sans GB\", u5b8bu4f53, sans-serif;\">【4.8美的大牌秒杀日】爆款直降!大容量三口之家优选! *节能养鲜,自动低温补偿,36分贝静音呵护! *每天不到一度电,省钱又省心!</span>&nbsp;</p>\n",
      "__v": 0
  }]
  }
  columns=[
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width:100
      //render ((status)=>{status===1?})
    },
    {
      title: '操作',
      dataIndex: 'desc',
    }
  ]
  render() {
    const {date,loading}=this.state
    const {Option}=Select
    const {getFieldDecorator}=this.props.form
    const extra=(<Button type="primary" onClick={()=>{
      }}>
      <Icon type="plus"/>
      添加商品
    </Button>)
    const title=(
      <Form layout="inline"  onSubmit={this.handleSubmit}>
        <Form.Item >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请选择搜索方式' }],
          })(
            <Select
            style={{width:200}}
            placeholder="请选择搜索方式"
            onChange={this.handleSelectChange}
          >
            <Option value="an">按名称搜索</Option>
            <Option value="female">按描述搜索</Option>
          </Select>,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              
              placeholder="关键字"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
        </Form.Item>
      </Form>
    )
    return (
      <Card title={title} extra={extra} style={{ width: "100%" }}>
      <Table
          columns={this.columns}
          dataSource={date}
          bordered
          loading={loading}
          rowKey="_id"
          pagination={{ defaultPageSize:3, showQuickJumper: true}}
        />
    </Card>
    )
  }
}
export default Form.create()(Product)
 