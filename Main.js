import React from "react";
import RouterScreen from "./RouterScreen";
/**
 * createStore => this is used to create a store
 */
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

// initial state is just an object with key value pairs
const initialState = {
  vehicleList: []
};
//state means the data which store will hold

// whenever we dispatch an action to do something on the store it has two options
// 1.type => it means name of the action
// 2.payload => whatever parameter or argument you are sending the action
const myStore = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialStateTemp = {
  farzi: "farzi",
  filter: {
    isBikeAvailableOnly: false,
    isDocsAvailableOnly: false,
    isServiceAvailableOnly: false,
    sliderBikesValue: 0,
    sliderDocsValue: 0
  },
  sort: {
    isBLowToHigh: false,
    isBHighToLow: false,
    isDLowToHigh: false,
    isDHighToLow: false
  }
};

// method to invoke DO_NOTHING
//let payload = null
/* this.props.dispatch({
    type : "DO_NOTHING",
    payload
})
*/
const yourStore = (state = initialStateTemp, action) => {
  switch (action.type) {
    case "DO_NOTHING":
      return {
        ...state,
        farzi: "No farzi"
      };
    case "CHANGE_FILTER_OPTION_VALUE":
      console.log("action dispatched", action);
      return {
        ...state,
        filter: action.payload
      };
    case "CHANGE_SORT_OPTION":
      console.log("action dispatched", action);
      return {
        ...state,
        sort: action.payload
      };
    default:
      return state;
  }
};
// function myStore(state,action){
//     switch(action.type){
//         default:
//             return state
//     }
// }

// we use combine reducer if we have multiple stores
const reducer = combineReducers({
  myStore: myStore,
  yourStore: yourStore
});
const store = createStore(reducer);

// to connect a store with a component we use Provider
export default class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RouterScreen />
      </Provider>
    );
  }
}

// the state of this application will looks like
/**
 * state:{
 * myStore:{
 * vehicleList:[]
 * },
 * yourStore:{
 * farzi:"farzi"
 * }
 * }
 */

// state.myStore.vehicleList
