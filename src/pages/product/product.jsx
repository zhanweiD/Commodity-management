import React, { Component } from 'react'
import {Route,Switch,Redirect} from "react-router-dom"

import ProductHome from "./home"
import Details from "./details"
import AddUpdatePro from "./add-updatePro"

export default class Product extends Component{
  render() {
    return (
     <Switch>
       <Route path="/product" component={ProductHome}/>
       <Route path="/product/details" component={Details}/>
       <Route path="/product/addUpdatePro" component={AddUpdatePro}/>
       <Redirect to="/product"/>
     </Switch>
    )
  }
}
 