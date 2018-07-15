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
            headerRight: (
                <TouchableOpacity>
                    <Image source={require('../../assets/images/add_item.png')} style={{width: 24, height: 24, marginRight:16}}/>
                </TouchableOpacity>
            ),
            title: 'Privée'
        })
    }
});
