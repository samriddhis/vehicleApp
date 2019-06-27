/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import ScreenView from "./ScreenView";
import { name as appName } from "./app.json";
import Main from "./Main";

AppRegistry.registerComponent(appName, () => Main);
