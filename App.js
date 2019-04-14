import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar
} from "react-native";
const { height, width } = Dimensions.get("window");
import { Icon } from "react-native-elements";
import ListComponent from "./ListComponent";
import FilterComponent from "./FilterComponent";
import * as data from "./codebeautify.json";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noFilter: true,
      isBikeAvailableOnly: false,
      isDocsAvailableOnly: false,
      isServiceAvailableOnly: false,
      sliderBikesValue: 0,
      sliderDocsValue: 0,
      itemList: data.stationBeanList
    };
    this.enableNoFilter = this.enableNoFilter.bind(this);
    this.changeBikeAvailibiltyOption = this.changeBikeAvailibiltyOption.bind(
      this
    );
  }

  enableNoFilter = () => {
    this.setState({ noFilter: true });
  };
  changeBikeAvailibiltyOption = (
    bikeChecked,
    docsChecked,
    bikeValue,
    docsValue,
    serviceChecked
  ) => {
    let newData = [];
    if (bikeChecked === true && docsChecked === true) {
      if (serviceChecked === true) {
        newData = data.stationBeanList.filter(
          row =>
            row.availableBikes > 0 &&
            row.availableDocks > 0 &&
            row.availableBikes > bikeValue &&
            row.availableDocks > docsValue &&
            row.statusValue == "In Service"
        );
      } else {
        newData = data.stationBeanList.filter(
          row =>
            row.availableBikes > 0 &&
            row.availableDocks > 0 &&
            row.availableBikes > bikeValue &&
            row.availableDocks > docsValue
        );
      }
    } else if (docsChecked === true) {
      if (serviceChecked === true) {
        newData = data.stationBeanList.filter(
          row =>
            row.availableDocks > 0 &&
            row.availableBikes > bikeValue &&
            row.availableDocks > docsValue &&
            row.statusValue == "In Service"
        );
      } else {
        newData = data.stationBeanList.filter(
          row =>
            row.availableDocks > 0 &&
            row.availableBikes > bikeValue &&
            row.availableDocks > docsValue
        );
      }
    } else if (bikeChecked === true) {
      if (serviceChecked === true) {
        newData = data.stationBeanList.filter(
          row =>
            row.availableBikes > 0 &&
            row.availableBikes > bikeValue &&
            row.availableDocks > docsValue &&
            row.statusValue == "In Service"
        );
      } else {
        newData = data.stationBeanList.filter(
          row =>
            row.availableBikes > 0 &&
            row.availableBikes > bikeValue &&
            row.availableDocks > docsValue
        );
      }
    } else {
      newData = data.stationBeanList;
    }

    this.setState({
      isBikeAvailableOnly: bikeChecked,
      isDocsAvailableOnly: docsChecked,
      sliderBikesValue: bikeValue,
      sliderDocsValue: docsValue,
      isServiceAvailableOnly: serviceChecked,
      itemList: newData
    });
  };
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={"#3973ad"} barStyle={"light-content"} />
        <View style={styles.container}>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>News</Text>
            <View style={styles.iconsStyle}>
              <Icon
                color="#fff"
                style={styles.filterStyle}
                name="filter"
                type="font-awesome"
                onPress={() =>
                  this.setState({ noFilter: !this.state.noFilter })
                }
              />
              <Icon
                color="#fff"
                style={styles.sortStyle}
                name="sort"
                type="material-community"
              />
            </View>
          </View>
          {this.state.noFilter ? (
            <ListComponent newsData={this.state.itemList} />
          ) : (
            <FilterComponent
              enableNoFilter={this.enableNoFilter}
              modalVisible={this.state.noFilter}
              isBikeAvailableOnly={this.state.isBikeAvailableOnly}
              isDocsAvailableOnly={this.state.isDocsAvailableOnly}
              sliderBikesValue={this.state.sliderBikesValue}
              sliderDocsValue={this.state.sliderDocsValue}
              isServiceAvailableOnly={this.state.isServiceAvailableOnly}
              changeBikeAvailibiltyOption={this.changeBikeAvailibiltyOption}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6"
  },
  headerStyle: {
    flexDirection: "row",
    height: height / 12,
    width: width,
    backgroundColor: "#3973ad"
  },
  headerTextStyle: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 30,
    color: "#fff"
  },
  iconsStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 10
  },
  filterStyle: {},
  sortStyle: {}
});
