import React,{ Component } from "react";
import {View,Text,Dimensions,TouchableOpacity} from "react-native"

const {width,height} = Dimensions.get("window")
export default class FirstPage extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={{
                flex:1,
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"#fff"
            }}>
                <Text>{"First Page"}</Text>
                <TouchableOpacity 
                onPress={() => this.props.navigation.navigate("FilterScreen")}
                style={{
                    width:width / 3,
                    height:height / 20,
                    justifyContent:"center",
                    alignItems:"center",
                    backgroundColor:"#3366cc"
                }}>
                    <Text style={{color:"#fff"}}>{"Navigation"}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}