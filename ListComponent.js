import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Alert,
  TouchableOpacity
} from "react-native";
import * as data from "./codebeautify.json";
const { height, width } = Dimensions.get("window");
import { Icon } from "react-native-elements";

export default class ListComponent extends React.Component {
  constructor(props) {
    super(props);
    const records = data.stationBeanList;
    this.state = { newsData: records, listScrollHeight: 0 };
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
          ref={ref => (this.listRef = ref)}
          data={this.props.newsData}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          onScroll={event =>
            this.setState({
              listScrollHeight: event.nativeEvent.contentOffset.y
            })
          }
          stickyHeaderIndices={[0]}
          ListHeaderComponent={() => {
            if (this.state.listScrollHeight > height) {
              return (
                <View
                  style={{
                    width: width,
                    height: height / 15,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.listRef.scrollToIndex({ animated: true, index: 0 })
                    }
                    style={{
                      width: width / 3,
                      height: height / 20,
                      borderRadius: width / 30,
                      shadowOffset: { width: 3, height: 3 },
                      shadowColor: "black",
                      shadowOpacity: 0.3,
                      elevation: 5,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fff"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: height / 55,
                        color: "#c13d4a"
                      }}
                    >
                      {`Scroll to top`}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            } else return null;
          }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  separator: {
    width: width,
    height: height / 40,
    backgroundColor: "#ececec"
  },
  listViewStyle: {
    backgroundColor: "#FFFFFF",
    padding: width / 20
  },
  bikeViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height / 90,
    width: width / 7,
    justifyContent: "space-between"
  },
  docViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height / 90,
    width: width / 7,
    justifyContent: "space-between"
  },
  statusViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height / 90
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
