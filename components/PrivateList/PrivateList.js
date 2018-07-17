import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import ItemListView from '../ItemListView/ItemListView';
import { 
    storeItem, 
    getItems, 
    deleteItem,
    clearAllStorage, 
    updateItem 
} from './PrivateDataService';
import { listeStyle } from '../../assets/styles';
import ItemModal from '../ItemModal/ItemModal'

export default class PrivateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            popupHidden: true,
            updatePopup: false,
            updateID: -1
        }
        this.changeQuantity = this.changeQuantity.bind(this);
        this.addItemToBase = this.addItemToBase.bind(this);
        this.cancelAdd = this.cancelAdd.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.updateItemInBase = this.updateItemInBase.bind(this);
    }
    static navigationOptions = ({ navigation }) => ({
        headerRight: (
            <TouchableOpacity onPress={() => navigation.state.params.showPopup()}>
                <Image source={require('../../assets/images/add_item.png')} style={{ width: 24, height: 24, marginRight: 16 }} />
            </TouchableOpacity>
        )
    });
    componentDidMount() {
        this.props.navigation.setParams({showPopup: this.togglePopup})
        getItems().then(
            (storedItems) => {
                this.setState({ items: storedItems });
            },
            (error) => {
                console.log('error');
                console.log(error);
            }
        );
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ItemListView
                    items={this.state.items}
                    changeQuantity={(item, id) => this.changeQuantity(item, id)}
                    deleteItem={(id) => this.deleteItem(id)}
                    updateItem={(id) => this.updateItemModal(id)}
                /> 
                <ItemModal updateID={this.state.updateID} updateItem={(id, itemJSON) => this.updateItemInBase(id, itemJSON)} updatePopup={this.state.updatePopup} popupHidden={this.state.popupHidden} cancelAdd={this.cancelAdd} addItem={(itemJSON) => this.addItemToBase(itemJSON)} />
            </View>
        )
    }
    togglePopup() {
        this.setState({popupHidden: !this.state.popupHidden});
    }
    changeQuantity(item, id) {
        console.log("change quantity");
        console.log(item);
        updateItem(id, item).then(
            (bool) => {
                getItems().then((items) => {
                    this.setState({ items: items });
                });
            }
        );
    }
    addItemToBase(itemJSON) {
        console.log("Add");
        console.log(itemJSON);
        this.setState({popupHidden: true});
        storeItem(itemJSON).then(
            (resolved) => {
                getItems().then((items) => {
                    this.setState({ items: items });
                });
            }
        );
    }
    cancelAdd() {
        this.setState({popupHidden: true});
    }
    deleteItem(id) {
        deleteItem(id).then(() => {
            getItems().then((items) => {
                this.setState({ items: items });
            });
        });
    }
    updateItemModal(id) {
        this.setState({
            popupHidden: false,
            updatePopup: true,
            updateID: id
        });
    }
    updateItemInBase(id, itemJSON) {
        this.setState({
            popupHidden: true,
            updatePopup: false,
            updateID: -1
        });
        updateItem(id, itemJSON).then(
            (bool) => {
                getItems().then((items) => {
                    this.setState({ items: items });
                });
            }
        );
    }
}