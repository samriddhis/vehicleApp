import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
  BackHandler,
  ActivityIndicator
} from "react-native";
const { height, width } = Dimensions.get("window");
import { Icon, SearchBar } from "react-native-elements";
import ListComponent from "./ListComponent";
import FilterComponent from "./FilterComponent";
import SortComponent from "./SortComponent";
import { connect } from "react-redux";
//import * as data from "./codebeautify.json";

//url to fetch list https://5d176983-cb02-4f48-b307-5a24d9961571.mock.pstmn.io/getVehicleList

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("props in app", props);
    this.state = {
      noFilter: true,
      noSort: true,
      isBikeAvailableOnly: false,
      isDocsAvailableOnly: false,
      isServiceAvailableOnly: false,
      sliderBikesValue: 0,
      sliderDocsValue: 0,
      // itemList: data.stationBeanList,
      isBLowToHigh: false,
      isBHighToLow: false,
      isDLowToHigh: false,
      isDHighToLow: false,
      text: "",
      isLoading: true,
      defaultData: []
    };
    this.enableNoFilter = this.enableNoFilter.bind(this);
    this.enableNoSort = this.enableNoSort.bind(this);
    this.changeBikeAvailibiltyOption = this.changeBikeAvailibiltyOption.bind(
      this
    );
    this.applySortOption = this.applySortOption.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  callVehicleApi() {
    return new Promise(function(resolve, reject) {
      try {
        fetch(
          "https://5d176983-cb02-4f48-b307-5a24d9961571.mock.pstmn.io/getVehicleList"
        )
          .then(response => response.json())
          .then(responseJson => {
            resolve(responseJson);
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  async getPromiseValue() {
    try {
      let response = await this.callVehicleApi();
      console.log("response from server", response);
      this.setState({
        isLoading: false,
        itemList: response.stationBeanList,
        defaultData: response.stationBeanList
      });
      this.arrayholder = this.state.itemList;
    } catch (error) {
      this.setState({ isLoading: false, itemList: [] });
    }
  }
  componentDidMount() {
    this.getPromiseValue();
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
        newData = this.state.itemList.filter(
          row =>
            row.availableBikes > 0 &&
            row.availableDocks > 0 &&
            row.availableBikes > bikeValue &&
            row.availableDocks > docsValue &&
            row.statusValue == "In Service"
        );
      } else {
        newData = this.state.itemList.filter(
          row =>
            row.availableBikes > 0 &&
            row.availableDocks > 0 &&
            row.availableBikes > bikeValue &&
            row.availableDocks > docsValue
        );
      }
    } else if (docsChecked === true) {
      if (serviceChecked === true) {
        newData = this.state.itemList.filter(
          row =>
            row.availableDocks > 0 &&
            row.availableBikes > bikeValue &&
            row.availableDocks > docsValue &&
            row.statusValue == "In Service"
        );
      } else {
        newData = this.state.itemList.filter(
          row =>
            row.availableDocks > 0 &&
            row.availableBikes > bikeValue &&
            row.availableDocks > docsValue
        );
      }
    } else if (bikeChecked === true) {
      if (serviceChecked === true) {
        newData = this.state.itemList.filter(
          row =>
            row.availableBikes > 0 &&
            row.availableBikes > bikeValue &&
            row.availableDocks > docsValue &&
            row.statusValue == "In Service"
        );
      } else {
        newData = this.state.itemList.filter(
          row =>
            row.availableBikes > 0 &&
            row.availableBikes > bikeValue &&
            row.availableDocks > docsValue
        );
      }
    } else {
      newData = this.state.itemList;
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

  changeBikeAvailibiltyOptionFarzi = filter => {
    console.log("props in farzi option", this.props);
    let newData = [];
    const {
      isBikeAvailableOnly,
      isDocsAvailableOnly,
      sliderBikesValue,
      sliderDocsValue,
      isServiceAvailableOnly
    } = filter;
    newData = this.state.defaultData.filter(row => {
      let condition = true;
      if (isBikeAvailableOnly === true) {
        condition = condition && row.availableBikes > 0;
      }
      if (isDocsAvailableOnly === true) {
        condition = condition && row.availableDocks > 0;
      }
      condition = condition && row.availableBikes >= sliderBikesValue;
      condition = condition && row.availableDocks >= sliderDocsValue;
      if (isServiceAvailableOnly === true) {
        condition = condition && row.statusValue === "In Service";
      }
      return condition;
    });
    this.setState({
      itemList: newData
    });
  };
  applySortOption = (bLowToHigh, bHighToLow, dLowToHigh, dHighToLow) => {
    saveData = this.state.defaultData.slice();
    if (bLowToHigh || bHighToLow || dLowToHigh || dHighToLow) {
      newData = saveData.sort(function(a, b) {
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
      newData = saveData;
    }

    this.setState({
      isBLowToHigh: bLowToHigh,
      isBHighToLow: bHighToLow,
      isDLowToHigh: dLowToHigh,
      isDHighToLow: dHighToLow,
      itemList: newData
    });
  };
  _filterPress() {
    //this.setState({ noFilter: !this.state.noFilter });
    this.props.navigation.navigate("FilterScreen");
  }

  searchFilterFunction = text => {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.stationName.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({ itemList: newData, text: text });
  };

  shouldComponentUpdate(props, state) {
    console.log("the props are changed", props, this.props);
    if (props.filter !== this.props.filter) {
      this.changeBikeAvailibiltyOptionFarzi(props.filter);
    }
    return true;
  }

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
                onPress={() => this._filterPress()}
              />
              <Icon
                color="#fff"
                style={styles.sortStyle}
                name="sort"
                type="material-community"
                onPress={() =>
                  this.props.navigation.navigate("SortScreen", {
                    scope: this,
                    enableNoSort: this.enableNoSort,
                    modalVisible: this.state.noSort,
                    isBLowToHigh: this.state.isBLowToHigh,
                    isBHighToLow: this.state.isBHighToLow,
                    isDLowToHigh: this.state.isDLowToHigh,
                    isDHighToLow: this.state.isDHighToLow,
                    applySortOption: this.applySortOption
                  })
                }
              />
            </View>
          </View>
          <View style={styles.SearchBarViewStyle}>
            <SearchBar
              style={styles.SearchBarStyle}
              lightTheme
              placeholder="Type Here..."
              onChangeText={text => this.searchFilterFunction(text)}
              autoCorrect={false}
              value={this.state.text}
            />
          </View>
          {this.state.isLoading ? (
            <View style={styles.indicatorViewStyle}>
              <ActivityIndicator
                color="#3973ad"
                size="large"
                style={styles.indicatorStyle}
              />
            </View>
          ) : (
            <View />
          )}
          <ListComponent newsData={this.state.itemList} />
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
  sortStyle: {},
  SearchBarViewStyle: {
    width: width
  },
  indicatorViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  indicatorStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

function mapStateToProps(state) {
  return {
    vehicleList: state.myStore.vehicleList,
    filter: state.yourStore.filter
  };
}

export default connect(mapStateToProps)(App);
