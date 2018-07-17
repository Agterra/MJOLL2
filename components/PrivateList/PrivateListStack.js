import React, { Component } from 'react';
import {
    createStackNavigator
} from 'react-navigation';
import {
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import PrivateList from './PrivateList';

export const PrivateListStack = createStackNavigator({
    PrivateList: {
        screen: PrivateList,
        navigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: 'green',
            },
            headerTitleStyle: {
                color: 'white',
                width: 100
            },
            title: 'Privée'
        })
    }
});
