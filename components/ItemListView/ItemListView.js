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
        this.changeName = this.changeName.bind(this);
        this.addItem = this.addItem.bind(this);
    }
    render() {
        return (
            <View style={styles.mainViewContainer}>
                <FlatList
                    data={this.props.items}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <ListCell
                            itemID={item.id}
                            itemData={item.json}
                            changeName={this.changeName}
                            deleteItem={(id) => this.props.deleteItem(id)}
                            changeQuantity={(item, id) => this.changeQuantity(item, id)} />
                    }
                    style={{ flex: 1 }}
                />
            </View>
        )
    }
    changeQuantity(item, id) {
        this.props.changeQuantity(item, id);
    }
    changeName(){

    }
    addItem() {
        this.props.addItem();
    }
}

class ListCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemID: -1,
            itemData: {
                name: '',
                quantity: 0
            }
        }
    }
    componentDidMount() {
        this.setState({
            itemID: this.props.itemID, 
            itemData: this.props.itemData
        });
    }
    render() {
        return (
            <View style={styles.cellView}>
                {/* <CheckBox value={this.state.selected} onValueChange={this.updateSelection} style={{ marginLeft: 10 }}></CheckBox> */}
                <View style={{ flex: 2 }}>
                    <TouchableOpacity
                        onPress={() => this.props.changeName}
                        onLongPress={() => this.props.deleteItem(this.state.itemID)}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={styles.itemText}>
                            {this.state.itemData.name}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.operationsView}>
                    <TouchableOpacity
                        style={styles.operationButtons}
                        onPress={() => {
                            this.state.itemData.quantity++;
                            this.props.changeQuantity(this.state.itemData, this.state.itemID)
                        }}
                        onLongPress={() => {
                            this.state.itemData.quantity += 10;
                            this.props.changeQuantity(this.state.itemData, this.state.itemID);
                        }}>
                        <Text>
                            +
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ width: 30, textAlign: 'center' }}>{this.state.itemData.quantity}</Text>
                    <TouchableOpacity
                        style={styles.operationButtons}
                        onPress={() => {
                            if (this.state.itemData.quantity > 1) {
                                this.state.itemData.quantity--;
                                this.props.changeQuantity(this.state.itemData, this.state.itemID);
                            }
                        }}
                        onLongPress={() => {
                            if (this.state.itemData.quantity > 10) {
                                this.state.itemData.quantity -= 10;
                                this.props.changeQuantity(this.state.itemData, this.state.itemID);
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