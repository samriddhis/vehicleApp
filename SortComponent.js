import React from "react";
import { StyleSheet, Text, View, Dimensions, Modal, Alert } from "react-native";
const { height, width } = Dimensions.get("window");
import { Icon, CheckBox, Slider, Button } from "react-native-elements";
import { connect } from "react-redux";

class SortComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bLowToHigh: this.props.sort.isBLowToHigh,
      bHighToLow: this.props.sort.isBHighToLow,
      dLowToHigh: this.props.sort.isDLowToHigh,
      dHighToLow: this.props.sort.isDHighToLow
    };
  }
  _backButtonPress() {
    this.props.navigation.goBack();
  }
  _removeFilterButton() {
    this.props.dispatch({
      type:"CHANGE_SORT_OPTION",
      payload:{
        isBLowToHigh:false,
        isBHighToLow:false,
        isDLowToHigh:false,
        isDHighToLow:false
      }
    })
    this.props.navigation.goBack();
  }
  _applyFilter() {
    this.props.dispatch({
      type:"CHANGE_SORT_OPTION",
      payload:{
        isBLowToHigh:this.state.bLowToHigh,
        isBHighToLow:this.state.bHighToLow,
        isDLowToHigh:this.state.dLowToHigh,
        isDHighToLow:this.state.dHighToLow
      }
    })
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={styles.filterContainerStyle}>
        <View style={[styles.headerStyle]}>
          <Icon
            color="#fff"
            style={styles.filterStyle}
            name="arrowleft"
            type="antdesign"
            onPress={() => this._backButtonPress()}
          />
          <Text style={styles.headerTextStyle}>Sort</Text>
          <Icon
            color="#fff"
            style={styles.filterStyle}
            name="clear"
            type="material-icons"
            onPress={() => this._removeFilterButton()}
          />
        </View>
        <View style={styles.containerStyle}>
          <View style={styles.buttonViewStyle}>
            <CheckBox
              title="Bikes(Asc)"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.bLowToHigh}
              onPress={() => {
                this.setState({
                  bLowToHigh: !this.state.bLowToHigh,
                  bHighToLow: false,
                  dLowToHigh: false,
                  dHighToLow: false
                });
              }}
            />
            <CheckBox
              title="Bikes(Desc)"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.bHighToLow}
              onPress={() =>
                this.setState({
                  bHighToLow: !this.state.bHighToLow,
                  bLowToHigh: false,
                  dLowToHigh: false,
                  dHighToLow: false
                })
              }
            />
            <CheckBox
              title="Docs(Asc)"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.dLowToHigh}
              onPress={() => {
                this.setState({
                  dLowToHigh: !this.state.dLowToHigh,
                  bLowToHigh: false,
                  bHighToLow: false,
                  dHighToLow: false
                });
              }}
            />
            <CheckBox
              title="Docs(Desc)"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={this.state.dHighToLow}
              onPress={() =>
                this.setState({
                  dHighToLow: !this.state.dHighToLow,
                  bLowToHigh: false,
                  bHighToLow: false,
                  dLowToHigh: false
                })
              }
            />
            <Button
              style={styles.buttonStyle}
              title="Apply"
              onPress={() => this._applyFilter()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterContainerStyle: {
    flex: 1,
    backgroundColor: "#F6F6F6"
  },
  modalStyle: {},
  headerStyle: {
    padding: width / 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: height / 12,
    width: width,
    backgroundColor: "#3973ad"
  },
  headerTextStyle: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 25,
    color: "#fff"
  },
  containerStyle: {
    padding: width / 30,
    width: width
  },
  buttonViewStyle: {
    padding: 10
  }
});

function mapStateToProps(state) {
  return {
    vehicleList: state.myStore.vehicleList,
    sort: state.yourStore.sort
  };
}


export default connect(mapStateToProps)(SortComponent)