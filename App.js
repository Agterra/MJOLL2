import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {TabNavigator} from './navigation/TabNavigator';
import ItemListView from './components/ItemListView/ItemListView';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator /> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
