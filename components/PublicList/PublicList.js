// import React, { Component } from 'react';
// import {
//     Image,
//     Text,
//     TextInput,
//     View,
//     TouchableOpacity,
//     KeyboardAvoidingView,
// } from 'react-native';
// import ItemListView from '../ItemListView/ItemListView';
// import firebase from 'react-native-firebase';
// // import { storeItem, getItems } from './PrivateDataService';
// import ItemModal from '../ItemModal/ItemModal';

// export default class PublicList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             items: [],
//             popupHidden: true,
//             objectID: -1
//         }
//         this.changeQuantity = this.changeQuantity.bind(this);
//         this.addItem = this.addItem.bind(this);
//         this.addItemToBase = this.addItemToBase.bind(this);
//         this.cancelAdd = this.cancelAdd.bind(this);
//         this.deleteItem = this.deleteItem.bind(this);
//     }

//     componentDidMount() {
//         firebase.database().goOnline();
//         firebase.database().ref("/publicID").on('value', (snapshot) => {
//             console.log(typeof snapshot.val());
//             this.setState({ objectID: snapshot.val().id });
//         })
//         firebase.database().ref("/public").on('value', (snapshot) => {
//             var keys = Object.keys(snapshot.val());
//             var fetchedItems = JSON.parse(JSON.stringify(snapshot.val()));
//             if (fetchedItems) {
//                 var array = [];
//                 console.log(typeof fetchedItems);
//                 keys.map(function (value) {
//                     var snapshotItem = snapshot.val()[value];
//                     if (snapshotItem) {
//                         var item = {
//                             id: snapshotItem.id,
//                             json: {
//                                 name: snapshotItem.name,
//                                 quantity: snapshotItem.quantity,
//                             }
//                         }
//                         array.push(item);
//                     }
//                 });
//                 this.setState({ objects: array });
//             }
//         });
//     }

//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 <ItemListView
//                     items={this.state.items}
//                     addItem={() => this.addItem()}
//                     changeQuantity={(item, id) => this.changeQuantity(item, id)}
//                     deleteItem={(id) => this.deleteItem(id)}
//                 />
//                 <ItemModal popupHidden={this.state.popupHidden} cancelAdd={this.cancelAdd} addItem={(itemJSON) => this.addItemToBase(itemJSON)} />
//             </View>
//         )
//     }

//     navigationOptions = ({ navigation }) => ({
//         headerRight: (
//             <TouchableOpacity onPress={() => this.addItem()}>
//                 <Image source={require('../../assets/images/add_item.png')} style={{ width: 24, height: 24, marginRight: 16 }} />
//             </TouchableOpacity>
//         ),
//     })

//     addItem() {
//         this.setState({ popupHidden: false });
//     }

//     deleteItem(id) {
//         let itemPath = "/public/" + id;
//         firebase.database().ref(itemPath).remove();
//     }

//     addItemToBase(itemJSON) {
//         this.setState({ popupHidden: true });
//         var itemID = this.state.objectID;
//         let itemPath = "/public/" + itemID;
//         firebase.database().ref(itemPath).set({
//             id: itemID,
//             name: itemJSON.name,
//             quantity: +itemJSON.quantity
//         });
//         firebase.database().ref("/publicID").set({
//             id: this.state.objectID + 1
//         })
//     }

//     cancelAdd() {
//         this.setState({ popupHidden: true });
//     }

//     changeQuantity(item, id) {
//         let itemPath = "/public/" + id;
//         return firebase.database().ref(itemPath).set({
//             id: id,
//             name: item.name,
//             quantity: item.quantity
//         })
//     }
// }