import React, { Component } from 'react'
import {Route,Switch} from "react-router-dom"

import ProductHome from "./product-home"
import Details from "./details"
import AddUpdatePro from "./add-updatePro"

export default class Product extends Component{
  render() {
    return (
     <Switch>
       <Route path="/product/details" component={Details}/>
       <Route path="/product/addUpdatePro" component={AddUpdatePro}/>
       <Route path="/product" component={ProductHome}/>
     </Switch>
    )
  }
}
 