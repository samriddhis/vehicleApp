import React from "react";
import { StyleSheet, Text, View, Dimensions, Modal, Alert } from "react-native";
const { height, width } = Dimensions.get("window");
import { Icon, CheckBox, Slider, Button } from "react-native-elements";

export default class FilterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: true,
      bikeChecked: this.props.isBikeAvailableOnly,
      docsChecked: this.props.isDocsAvailableOnly,
      bikeValue: this.props.sliderBikesValue,
      docsValue: this.props.sliderDocsValue,
      serviceChecked: this.props.isServiceAvailableOnly
    };
  }
  _backButtonPress() {
    console.log("button fires");
    this.props.enableNoFilter();
  }
  _removeFilterButton() {
    this.props.enableNoFilter();
  }
  _applyFilter() {
    this.props.enableNoFilter();
    this.props.changeBikeAvailibiltyOption(
      this.state.bikeChecked,
      this.state.docsChecked,
      this.state.bikeValue,
      this.state.docsValue,
      this.state.serviceChecked
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
          <View style={[styles.headerStyle, { marginTop: height / 10 }]}>
            <Icon
              color="#fff"
              style={styles.filterStyle}
              name="arrowleft"
              type="antdesign"
              onPress={() => this._backButtonPress()}
            />
            <Text style={styles.headerTextStyle}>Filter</Text>
            <Icon
              color="#fff"
              style={styles.filterStyle}
              name="filter-remove"
              type="material-community"
              onPress={() => this._removeFilterButton()}
            />
          </View>
          <View style={styles.containerStyle}>
            <CheckBox
              iconRight
              title="Bikes Available"
              checked={this.state.bikeChecked}
              onPress={() => {
                this.setState({ bikeChecked: !this.state.bikeChecked });
              }}
            />
            <CheckBox
              iconRight
              title="Docks Available"
              checked={this.state.docsChecked}
              onPress={() =>
                this.setState({ docsChecked: !this.state.docsChecked })
              }
            />
            <View style={styles.bikeViewStyle}>
              <Text style={styles.textSliderStyle}>Range of Bikes</Text>
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={100}
                thumbStyle={styles.thumbSliderStyle}
                disabled={this.state.bikeChecked ? false : true}
                value={this.state.bikeValue}
                onValueChange={bikeValue => this.setState({ bikeValue })}
              />
              <Text style={styles.textSliderStyle}>
                Value: {this.state.bikeValue}
              </Text>
            </View>
            <View style={styles.docsViewStyle}>
              <Text style={styles.textSliderStyle}>Range ofDocs</Text>
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={100}
                thumbStyle={styles.thumbSliderStyle}
                disabled={this.state.bikeChecked ? false : true}
                value={this.state.docsValue}
                onValueChange={docsValue => this.setState({ docsValue })}
              />
              <Text style={styles.textSliderStyle}>
                Value: {this.state.docsValue}
              </Text>
            </View>
            <CheckBox
              iconRight
              title="In Service only"
              checked={this.state.serviceChecked}
              onPress={() =>
                this.setState({
                  serviceChecked: !this.state.serviceChecked
                })
              }
            />
            <View style={styles.buttonViewStyle}>
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
    padding: 15,
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
    padding: 15
  },
  bikeViewStyle: {
    padding: 10
  },
  textSliderStyle: {
    fontSize: 14,
    fontWeight: "bold"
  },
  thumbSliderStyle: {
    width: 17,
    height: 17,
    borderRadius: 20 / 2,
    backgroundColor: "black"
  },
  docsViewStyle: {
    padding: 10
  },
  buttonViewStyle: {
    padding: 10
  }
});
