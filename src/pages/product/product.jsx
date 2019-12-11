import React, { Component } from 'react'
import {Route,Switch} from "react-router-dom"

import ProductHome from "./home"
import Detail from "./details"
import AddUpdatePro from "./add-updatePro"

export default class Product extends Component{
  render() {
    return (
     <Switch>
       <Route path="/product/details" component={Detail}/>
       <Route path="/product/addUpdatePro" component={AddUpdatePro}/>
       <Route path="/product" component={ProductHome}/>
     </Switch>
    )
  }
}
 