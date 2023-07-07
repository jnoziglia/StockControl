/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Stock from './Stock'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Stock);
