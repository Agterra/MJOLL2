import React, { Component } from 'react';
import {
    FlatList,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    ListStyle,
    CellStyle,
} from './ItemListViewStyle';

export default class ItemListView extends Component {
    render() {
        return (
            <View style={ListStyle.mainContainer}>
                <FlatList
                    data={this.props.items}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => <ListCell {...item} />}
                    style={{flex:1}}
                />
            </View>
        )
    }
}

class ListCell extends Component {
    render() {
        return (
            <View style={CellStyle.mainContainer}>
                <TouchableOpacity style={CellStyle.textZone}>
                    <Text>{this.props.name}</Text>
                </TouchableOpacity>
                <View style={CellStyle.quantityView}>
                    <TouchableOpacity style={CellStyle.quantityButton}>
                        <Text>+</Text>
                    </TouchableOpacity>
                    <Text>{this.props.quantity}</Text>
                    <TouchableOpacity style={CellStyle.quantityButton}>
                        <Text>-</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}