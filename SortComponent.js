import React from "react";
import { StyleSheet, Text, View, Dimensions, Modal, Alert } from "react-native";
const { height, width } = Dimensions.get("window");
import { Icon, CheckBox, Slider, Button } from "react-native-elements";

export default class SortComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      bLowToHigh: this.props.navigation.getParam("isBLowToHigh"),
      bHighToLow: this.props.navigation.getParam("isBHighToLow"),
      dLowToHigh: this.props.navigation.getParam("isDLowToHigh"),
      dHighToLow: this.props.navigation.getParam("isDHighToLow")
    };
    const { navigation } = this.props;
    this.enableNoSort = navigation.getParam("enableNoSort", function() {});
    this.applySortOption = navigation.getParam(
      "applySortOption",
      function() {}
    );
    this.scope = navigation.getParam("scope");
  }
  _backButtonPress() {
    this.enableNoSort();
    this.props.navigation.goBack();
  }
  _removeFilterButton() {
    this.enableNoSort();
    this.applySortOption.apply(this.scope, [false, false, false, false]);
    this.props.navigation.goBack();
  }
  _applyFilter() {
    this.enableNoSort();
    this.applySortOption.apply(this.scope, [
      this.state.bLowToHigh,
      this.state.bHighToLow,
      this.state.dLowToHigh,
      this.state.dHighToLow
    ]);
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
