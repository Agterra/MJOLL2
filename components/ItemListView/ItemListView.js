import React, { Component } from 'react';
import {
    FlatList,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    styles
} from './ItemListViewStyle';

export default class ItemListView extends Component {
    constructor(props) {
        super(props);
        this.changeQuantity = this.changeQuantity.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }
    render() {
        console.log("item");
        console.log(this.props.items);
        return (
            <View style={styles.mainViewContainer}>
                <FlatList
                    data={this.props.items}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <ListCell
                            itemID={item.itemID}
                            itemData={item.itemData}
                            updateItem={(id) => this.updateItem(id)}
                            deleteItem={(id) => this.props.deleteItem(id)}
                            changeQuantity={(item, id) => this.changeQuantity(item, id)} />
                    }
                    style={{ flex: 1 }}
                />
            </View>
        )
    }
    changeQuantity(itemJSON, id) {
        this.props.changeQuantity(itemJSON, id);
    }
    updateItem(id){
        this.props.updateItem(id);
    }
    addItem() {
        this.props.addItem();
    }
}

class ListCell extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.cellView}>
                {/* <CheckBox value={this.state.selected} onValueChange={this.updateSelection} style={{ marginLeft: 10 }}></CheckBox> */}
                <View style={{ flex: 2 }}>
                    <TouchableOpacity
                        onPress={() => this.props.updateItem(this.props.itemID)}
                        onLongPress={() => this.props.deleteItem(this.props.itemID)}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={styles.itemText}>
                            {this.props.itemData.name}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.operationsView}>
                    <TouchableOpacity
                        style={styles.operationButtons}
                        onPress={() => {
                            this.props.itemData.quantity++;
                            this.props.changeQuantity(this.props.itemData, this.props.itemID)
                        }}
                        onLongPress={() => {
                            this.props.itemData.quantity += 10;
                            this.props.changeQuantity(this.props.itemData, this.props.itemID);
                        }}>
                        <Text>
                            +
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ width: 30, textAlign: 'center' }}>{this.props.itemData.quantity}</Text>
                    <TouchableOpacity
                        style={styles.operationButtons}
                        onPress={() => {
                            if (this.props.itemData.quantity > 1) {
                                this.props.itemData.quantity--;
                                this.props.changeQuantity(this.props.itemData, this.props.itemID);
                            }
                        }}
                        onLongPress={() => {
                            if (this.props.itemData.quantity > 10) {
                                this.props.itemData.quantity -= 10;
                                this.props.changeQuantity(this.props.itemData, this.props.itemID);
                            }
                        }}>
                        <Text>
                            -
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}