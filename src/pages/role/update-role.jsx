import React from "react"
import { Tree,Input,Form } from 'antd'
import PropTypes from 'prop-types'

import menuConfig from "../../config/menuConfig"

const { TreeNode } = Tree
const {Item}=Form

export default class UpdateRote extends React.Component {
  static propTypes = {
    role: PropTypes.object
  }
  
  state={checkedKeys:[]}  //拿不到props的数据this.props.role.menus

  //根据config生成treeNode树
  createTreeNode=(treeArr)=>{
    return treeArr.reduce((pre,item)=>{
      pre.push(
        <TreeNode title={item.title} key={item.key}>
         {item.children ? this.createTreeNode(item.children) : null}
        </TreeNode>
      )
      return pre
    },[])
  }

    /* 
    进行勾选操作时的回调
    checkedKeys: 最新的所有勾选的node的key的数组
    */
  handleCheck = (checkedKeys) => {
    // 更新状态
    this.setState({
      checkedKeys
    })
  }

  //在did中修改状态，会导致节点无法全部展开
  componentDidMount(){
    this.role=this.createTreeNode(menuConfig)
    const menus = this.props.role.menus
     this.setState({
       checkedKeys: menus
     })
   }
  //在Will中修改状态，节点全部展开
  // componentWillMount() {
  //   this.role = this.createTreeNode(menuConfig)
  //   // 根据传入角色的menus来更新checkedKeys状态
  //   const menus = this.props.role.menus
  //   this.setState({
  //     checkedKeys: menus
  //   })
  // }

  /* 
  组件接收到新的标签属性时就会执行(初始显示时不会调用)
  nextProps: 接收到的包含新的属性的对象
  */
  componentWillReceiveProps (nextProps) {
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
  }

  render() {
    const {checkedKeys}=this.state
    const role=this.props.role||{}
    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 },  // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }
    return (
      <div>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled/>
        </Item>
        <Tree
        checkable                    //选择框
        defaultExpandAll            //默认全部展开
        checkedKeys={checkedKeys}  //将实时选中状态写入组件状态
        onCheck={this.handleCheck}
      >
        <TreeNode title="平台权限" key="all">
          {this.role}
        </TreeNode>
      </Tree>
      </div>
    );
  }
}