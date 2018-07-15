import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';

export const storeItem = function (id, name, quantity) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('private_items').then(
            (items) => {
                var item = {
                    id: id,
                    name: name,
                    quantity: quantity
                }
                var storeItems = new Array();
                if (!items) {
                    storeItems.push(item);
                } else {
                    storeItems = JSON.parse(items);
                    storeItems.push(item);
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