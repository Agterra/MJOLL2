import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';

export const storeItem = function (itemJSON) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('private_items').then(
            (items) => {
                var storeItems = new Array();
                if (!items) {
                    storeItems.push(itemJSON);
                } else {
                    storeItems = JSON.parse(items);
                    storeItems.push(itemJSON);
                }
                storeItems = JSON.stringify(storeItems);
                AsyncStorage.setItem('private_items', storeItems).then(
                    () => {
                        resolve(true);
                    }
                );
            },
            (error) => {
                console.log(error);
                reject(false);
            }
        );
    });
}

export const getItems = function () {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('private_items').then(
            (items) => {
                if(items) {
                    resolve(JSON.parse(items));
                } else {
                    resolve({});
                }
            },
            (error) => {
                reject({});
            }
        );
    });
}