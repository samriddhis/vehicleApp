import React,{Component} from "react"
import {createStackNavigator} from "react-navigation"
import FirstPage from "./FirstPage"
import SecondPage from "./SecondPage"
import App from "../App"
const RegisterScreen = createStackNavigator({
    FirstPage:{
        screen:FirstPage
    },
    SecondPage:{
        screen:SecondPage
    },
    FilterScreen:{
        screen:App
    }
},
{
    headerMode:"none",
    mode:"modal"
    //initialRouteName:"SecondPage"
}
)

export default RegisterScreen