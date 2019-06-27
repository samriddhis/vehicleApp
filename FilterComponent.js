import React from "react";
import { StyleSheet, Text, View, Dimensions, Modal, Alert } from "react-native";
const { height, width } = Dimensions.get("window");
import { Icon, CheckBox, Slider, Button } from "react-native-elements";
import { connect } from "react-redux";
class FilterComponent extends React.Component {
  constructor(props) {
    console.log("props of filter component", props);
    super(props);
    this.state = {
      bikeChecked: this.props.filter.isBikeAvailableOnly,
      docsChecked: this.props.filter.isDocsAvailableOnly,
      bikeValue: this.props.filter.sliderBikesValue,
      docsValue: this.props.filter.sliderDocsValue,
      serviceChecked: this.props.filter.isServiceAvailableOnly
    };
  }
  _backButtonPress() {
    this.props.navigation.goBack();
  }
  _removeFilterButton() {
    this.props.dispatch({
      type: "CHANGE_FILTER_OPTION_VALUE",
      payload: {
        isBikeAvailableOnly: false,
        isDocsAvailableOnly: false,
        sliderBikesValue: 0,
        sliderDocsValue: 0,
        isServiceAvailableOnly: false
      }
    });
    this.props.navigation.goBack();
  }
  _applyFilter() {
    this.props.dispatch({
      type: "CHANGE_FILTER_OPTION_VALUE",
      payload: {
        isBikeAvailableOnly: this.state.bikeChecked,
        isDocsAvailableOnly: this.state.docsChecked,
        sliderBikesValue: this.state.bikeValue,
        sliderDocsValue: this.state.docsValue,
        isServiceAvailableOnly: this.state.serviceChecked
      }
    });
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterContainerStyle: {
    flex: 1,
    backgroundColor: "#F6F6F6"
  },
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
    marginLeft: 10,
    fontSize: 25,
    color: "#fff"
  },
  containerStyle: {
    padding: width / 30,
    width: width
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

// here state is the state of redux store
function mapStateToProps(state) {
  return {
    farzi: state.yourStore.farzi,
    vehicleList: state.myStore.vehicleList,
    filter: state.yourStore.filter
  };
}

// this line connects our screen or component to redux state
export default connect(mapStateToProps)(FilterComponent);
