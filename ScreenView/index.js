import React,{ Component } from "react";
import {View,Text,Dimensions} from "react-native"
import RegisterScreen from "./RegisterScreen";


export default class ScreenView extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
           <RegisterScreen />
        )
    }
}