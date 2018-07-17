import React, { Component } from 'react';
import {
    AsyncStorage
} from 'react-native';

export const storeItem = function (itemJSON) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('private_items').then(
            (items) => {
                var storeItems = new Array();
                AsyncStorage.getItem('private_items_ids').then(
                    (id) => {
                        var item = {};
                        if (!id) {
                            AsyncStorage.setItem('private_items_ids', '1');
                            item = {
                                itemID: '0',
                                itemData: itemJSON
                            }
                        } else {
                            var count = parseInt(id, 10) + 1;
                            AsyncStorage.setItem('private_items_ids', count.toString());
                            item = {
                                itemID: id,
                                itemData: itemJSON
                            }
                        }
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
                    }
                )
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
                if (items) {
                    resolve(JSON.parse(items));
                } else {
                    resolve([]);
                }
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export const updateItem = function (id, json) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('private_items').then(
            (items) => {
                if (items) {
                    var parsedItems = JSON.parse(items);
                    var foundIndex = -1;
                    var found = parsedItems.filter((item, index) => {
                        if (item.itemID == id) {
                            foundIndex = index;
                            return true;
                        }
                        return false;
                    }
                    );
                    if (!found) {
                        reject("Erreur");
                    } else {
                        var updatedItem = {
                            itemID: id,
                            itemData: json
                        }
                        parsedItems[foundIndex] = updatedItem;
                        AsyncStorage.setItem('private_items', JSON.stringify(parsedItems)).then(
                            () => {
                                resolve(true);
                            },
                            (error) => {
                                reject(error);
                            })
                    }
                } else {
                    reject("Error");
                }
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export const deleteItem = function (id) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('private_items').then(
            (items) => {
                if (items) {
                    console.log("deleteitem");
                    var parsedItems = JSON.parse(items);
                    console.log(parsedItems);
                    var foundIndex = -1;
                    console.log(typeof id);
                    var found = parsedItems.filter((item, index) => {
                        if (item.itemID == id) {
                            foundIndex = index;
                            return true;
                        }
                        return false;
                    });
                    console.log(found);
                    console.log(foundIndex);
                    if (!found) {
                        reject("Erreur");
                    } else {
                        parsedItems.splice(foundIndex, 1);
                        console.log(parsedItems);
                        AsyncStorage.setItem('private_items', JSON.stringify(parsedItems)).then(() => {
                            resolve(true);
                        },
                            (error) => {
                                reject(error);
                            })
                    }
                } else {
                    reject("Error");
                }
            },
            (error) => {
                reject(error);
            }
        );
    });
}

export const clearAllStorage = function () {
    return new Promise((resolve, reject) => {
        AsyncStorage.setItem('private_items', '[]').then(
            () => {
                resolve(true);
            },
            (error) => {
                reject(error);
            }
        )
    });
}