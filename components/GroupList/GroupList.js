import React, { Component } from 'react';
import {
    View
} from 'react-native';
import ItemListView from '../ItemListView/ItemListView';
// import { storeItem, getItems } from './PrivateDataService';

export default class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }
    componentDidMount() {
        // getItems().then((items) => {
        //     this.setState({items: items});
        // });
    }
    render() {
        return(
            <ItemListView items={this.state.items}/>
        )
    }
}