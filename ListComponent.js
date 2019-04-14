import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Alert
} from "react-native";
import * as data from "./codebeautify.json";
const { height, width } = Dimensions.get("window");
import { Icon } from "react-native-elements";

export default class ListComponent extends React.Component {
  constructor(props) {
    super(props);
    const records = data.stationBeanList;
    this.state = { newsData: records };
  }
  _renderItem = ({ item, index }) => (
    <View style={styles.listViewStyle}>
      <Text style={styles.stationTextStyle}>
        Station Name : {item.stationName}
      </Text>
      <View style={styles.bikeViewStyle}>
        <Icon name="bike" type="material-community" />
        <Text style={styles.bikeTextStyle}>{item.availableBikes}</Text>
      </View>
      <View style={styles.docViewStyle}>
        <Icon name="documents" type="entypo" />
        <Text style={styles.docTextStyle}>{item.availableDocks}</Text>
      </View>
      <View style={styles.statusViewStyle}>
        <Text style={styles.statusTextStyle}>Status:</Text>
        {item.statusValue == "In Service" ? (
          <View style={styles.inCircleStyle} />
        ) : (
          <View style={styles.outCircleStyle} />
        )}
      </View>
    </View>
  );
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.dataStyle}
          data={this.props.newsData}
          renderItem={this._renderItem}
        />
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
  listViewStyle: {
    backgroundColor: "#FFFFFF",
    padding: width / 20
  },
  bikeViewStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: width / 7,
    justifyContent: "space-between"
  },
  docViewStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: width / 7,
    justifyContent: "space-between"
  },
  statusViewStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  stationTextStyle: {
    fontWeight: "bold",
    fontSize: 17
  },
  bikeTextStyle: {
    fontWeight: "bold",
    fontSize: 17
  },
  docTextStyle: {
    fontWeight: "bold",
    fontSize: 17
  },
  statusTextStyle: {
    fontWeight: "bold",
    fontSize: 17
  },
  inCircleStyle: {
    marginTop: 2,
    marginLeft: 2,
    width: 13,
    height: 13,
    borderRadius: 100 / 2,
    backgroundColor: "green"
  },
  outCircleStyle: {
    marginTop: 2,
    marginLeft: 2,
    width: 13,
    height: 13,
    borderRadius: 100 / 2,
    backgroundColor: "red"
  }
});
