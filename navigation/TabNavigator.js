import React, { Component } from 'react';
import {
    createBottomTabNavigator 
} from 'react-navigation';
import {
    Image
} from 'react-native';

import {PrivateListStack} from '../components/PrivateList/PrivateListStack';
import {PublicListStack} from '../components/PublicList/PublicListStack';
import {GroupListStack} from '../components/GroupList/GroupListStack';

export const TabNavigator = createBottomTabNavigator ({
    PublicList: {
        screen: PublicListStack,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                return ( <Image source={require('../assets/images/public_icon.png')} style={{width: 24, height: 24, tintColor: tintColor}}/> )
            }
        })
    },
    PrivateList: {
        screen: PrivateListStack,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                return(<Image source={require('../assets/images/private_icon.png')} style={{width: 24, height: 24, tintColor: tintColor}}/>)
            }
        })
    },
    GroupList: { 
        screen: GroupListStack,
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                return (<Image source={require('../assets/images/public_icon.png')} style={{width: 24, height: 24, tintColor: tintColor}}/>)
            }
        })
    }
},{
    initialRouteName: 'PublicList',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'rgba(255,255,255,0.2)',
        labelStyle: {
          fontSize: 14,
        },
        style: {
          backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center'
        },
        showLabel: false
      }
});