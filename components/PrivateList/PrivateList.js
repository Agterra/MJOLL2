import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import ItemListView from '../ItemListView/ItemListView';
import { storeItem, getItems } from './PrivateDataService';
import { listeStyle } from '../../assets/styles';
import ItemModal from '../ItemModal/ItemModal'

export default class PrivateList extends Component {
    static popupHidden = true;
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
        this.changeQuantity = this.changeQuantity.bind(this);
        this.addItemToBase = this.addItemToBase.bind(this);
        this.cancelAdd = this.cancelAdd.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    componentDidMount() {
        getItems().then((items) => {
            this.setState({ items: items });
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ItemListView
                    items={this.state.items}
                    changeQuantity={(item, id) => this.changeQuantity(item, id)}
                    deleteItem={(id) => this.deleteItem(id)}
                />
                <ItemModal popupHidden={PrivateList.popupHidden} cancelAdd={this.cancelAdd} addItem={(itemJSON) => this.addItemToBase(itemJSON)} />
            </View>
        )
    }
    changeQuantity(item, id){
        
    }
    addItemToBase(itemJSON) {
        this.setState({ popupHidden: true });
        storeItem(itemJSON).then(
            (resolved) => {
                getItems().then((items) => {
                    this.setState({ items: items });
                });
            }
        );
    }
    cancelAdd() {
        PrivateList.popupHidden = true;
    }
    deleteItem(id){

    }
}

PrivateList.navigationOptions = ({navigation}) => {
    headerRight: (
        <TouchableOpacity onPress={() => PrivateList.popupHidden = false}>
            <Image source={require('../../assets/images/add_item.png')} style={{width: 24, height: 24, marginRight:16}}/>
        </TouchableOpacity>
    )
}