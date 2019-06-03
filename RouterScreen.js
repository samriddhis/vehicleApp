import { createStackNavigator } from "react-navigation";
import FilterComponent from "./FilterComponent";
import SortComponent from "./SortComponent";
import App from "./App";
const RouterScreen = createStackNavigator({
  AppScreen: {
    screen: App
  },
  FilterScreen: {
    screen: FilterComponent
  },
  SortScreen: {
    screen: SortComponent
  }
},
{
    headerMode:"none"
}
);

export default RouterScreen;
