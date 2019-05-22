import React from "react";
import { StyleSheet, Text, View, Dimensions, Modal, Alert } from "react-native";
const { height, width } = Dimensions.get("window");
import { Icon, CheckBox, Slider, Button } from "react-native-elements";

export default class SortComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      bLowToHigh: this.props.isBLowToHigh,
      bHighToLow: this.props.isBHighToLow,
      dLowToHigh: this.props.isDLowToHigh,
      dHighToLow: this.props.isDHighToLow
    };
  }
  _backButtonPress() {
    this.props.enableNoSort();
  }
  _removeFilterButton() {
    this.props.enableNoSort();
    this.props.applySortOption(false, false, false, false);
  }
  _applyFilter() {
    this.props.enableNoSort();
    this.props.applySortOption(
      this.state.bLowToHigh,
      this.state.bHighToLow,
      this.state.dLowToHigh,
      this.state.dHighToLow
    );
  }
  render() {
    return (
      <View style={styles.filterContainerStyle}>
        <Modal
          style={styles.modalStyle}
          animationType="slide"
          transparent={false}
          visible={!this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={[styles.headerStyle, { marginTop: height / 40 }]}>
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
                  this.setState({ bLowToHigh: !this.state.bLowToHigh });
                }}
              />
              <CheckBox
                title="Bikes(Desc)"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={this.state.bHighToLow}
                onPress={() =>
                  this.setState({ bHighToLow: !this.state.bHighToLow })
                }
              />
              <CheckBox
                title="Docs(Asc)"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={this.state.dLowToHigh}
                onPress={() => {
                  this.setState({ dLowToHigh: !this.state.dLowToHigh });
                }}
              />
              <CheckBox
                title="Docs(Desc)"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={this.state.dHighToLow}
                onPress={() =>
                  this.setState({ dHighToLow: !this.state.dHighToLow })
                }
              />
              <Button
                style={styles.buttonStyle}
                title="Apply"
                onPress={() => this._applyFilter()}
              />
            </View>
          </View>
        </Modal>
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
