import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
  BackHandler
} from "react-native";
const { height, width } = Dimensions.get("window");
import { Icon } from "react-native-elements";
import ListComponent from "./ListComponent";
import FilterComponent from "./FilterComponent";
import SortComponent from "./SortComponent";
import * as data from "./codebeautify.json";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noFilter: true,
      noSort: true,
      isBikeAvailableOnly: false,
      isDocsAvailableOnly: false,
      isServiceAvailableOnly: false,
      sliderBikesValue: 0,
      sliderDocsValue: 0,
      itemList: data.stationBeanList,
      isBLowToHigh: false,
      isBHighToLow: false,
      isDLowToHigh: false,
      isDHighToLow: false
    };
    this.enableNoFilter = this.enableNoFilter.bind(this);
    this.enableNoSort = this.enableNoSort.bind(this);
    this.changeBikeAvailibiltyOption = this.changeBikeAvailibiltyOption.bind(
      this
    );
    this.applySortOption = this.applySortOption.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
    // this.props.navigation.goBack(null);
    return true;
  }

  enableNoFilter = () => {
    this.setState({ noFilter: true });
  };
  enableNoSort = () => {
    this.setState({ noSort: true });
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

  changeBikeAvailibiltyOptionFarzi = (
    bikeChecked,
    docsChecked,
    bikeValue,
    docsValue,
    serviceChecked
  ) => {
    let newData = [];
    newData = data.stationBeanList.filter(row => {
      let condition = true;
      if (bikeChecked === true) {
        condition = condition && row.availableBikes > 0;
      }
      if (docsChecked === true) {
        condition = condition && row.availableDocks > 0;
      }
      condition = condition && row.availableBikes >= bikeValue;
      condition = condition && row.availableDocks >= docsValue;
      if (serviceChecked === true) {
        condition = condition && row.statusValue === "In Service";
      }
      return condition;
    });
    this.setState({
      isBikeAvailableOnly: bikeChecked,
      isDocsAvailableOnly: docsChecked,
      sliderBikesValue: bikeValue,
      sliderDocsValue: docsValue,
      isServiceAvailableOnly: serviceChecked,
      itemList: newData
    });
  };
  applySortOption = (bLowToHigh, bHighToLow, dLowToHigh, dHighToLow) => {
    newData = data.stationBeanList.slice();
    if (bLowToHigh || bHighToLow || dLowToHigh || dHighToLow) {
      newData = newData.sort(function(a, b) {
        let condition = false;
        if (bLowToHigh === true) {
          condition = a.availableBikes - b.availableBikes;
        }
        if (bHighToLow === true) {
          condition = b.availableBikes - a.availableBikes;
        }
        if (dLowToHigh === true) {
          condition = a.availableDocks - b.availableDocks;
        }
        if (dHighToLow === true) {
          condition = b.availableDocks - a.availableDocks;
        }
        return condition;
      });
    } else {
      newData = data.stationBeanList;
    }

    this.setState({
      isBLowToHigh: bLowToHigh,
      isBHighToLow: bHighToLow,
      isDLowToHigh: dLowToHigh,
      isDHighToLow: dHighToLow,
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
                onPress={() => this.setState({ noSort: !this.state.noSort })}
              />
            </View>
          </View>
          {this.state.noFilter && this.state.noSort ? (
            <ListComponent newsData={this.state.itemList} />
          ) : (
            <View>
              {!this.state.noFilter ? (
                <FilterComponent
                  enableNoFilter={this.enableNoFilter}
                  modalVisible={this.state.noFilter}
                  isBikeAvailableOnly={this.state.isBikeAvailableOnly}
                  isDocsAvailableOnly={this.state.isDocsAvailableOnly}
                  sliderBikesValue={this.state.sliderBikesValue}
                  sliderDocsValue={this.state.sliderDocsValue}
                  isServiceAvailableOnly={this.state.isServiceAvailableOnly}
                  changeBikeAvailibiltyOption={this.changeBikeAvailibiltyOption}
                  changeBikeAvailibiltyOptionFarzi={
                    this.changeBikeAvailibiltyOptionFarzi
                  }
                />
              ) : (
                <SortComponent
                  enableNoSort={this.enableNoSort}
                  modalVisible={this.state.noSort}
                  isBLowToHigh={this.state.isBLowToHigh}
                  isBHighToLow={this.state.isBHighToLow}
                  isDLowToHigh={this.state.isDLowToHigh}
                  isDHighToLow={this.state.isDHighToLow}
                  applySortOption={this.applySortOption}
                />
              )}
            </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width / 30,
    height: height / 12,
    width: width,
    backgroundColor: "#3973ad"
  },
  headerTextStyle: {
    fontSize: 30,
    color: "#fff"
  },
  iconsStyle: {
    width: width / 5,
    borderWidth: 0,
    borderColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  filterStyle: {},
  sortStyle: {}
});
