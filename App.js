import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
const { height, width } = Dimensions.get("window");
import { Icon } from "react-native-elements";
import ListComponent from "./ListComponent";
import FilterComponent from "./FilterComponent";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { noFilter: true };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerTextStyle}>News</Text>
          <View style={styles.iconsStyle}>
            <Icon
             color= "#fff"
              style={styles.filterStyle}
              name="filter"
              type="font-awesome"
              onPress={() => this.setState({ noFilter: !this.state.noFilter })}
            />
            <Icon
              color= "#fff"
              style={styles.sortStyle}
              name="sort"
              type="material-community"
            />
          </View>
        </View>
        {this.state.noFilter ? <ListComponent /> : <FilterComponent />}
      </View>
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
    fontFamily: "open-sans-bold",
    color: "#fff"
  },
  iconsStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 10
  },
  filterStyle: {
  },
  sortStyle: {}
});
