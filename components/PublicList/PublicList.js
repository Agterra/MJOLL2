import React, { Component } from 'react';
import {
    Image,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import ItemListView from '../ItemListView/ItemListView';
import firebase from 'react-native-firebase';
// import { storeItem, getItems } from './PrivateDataService';

export default class PublicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            popupHidden: true,
            objectID: -1
        }
        this.changeQuantity = this.changeQuantity.bind(this);
        this.addItem = this.addItem.bind(this);
        this.addItemToBase = this.addItemToBase.bind(this);
        this.cancelAdd = this.cancelAdd.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        firebase.database().goOnline();
        firebase.database().ref("/publicID").on('value', (snapshot) => {
            console.log(typeof snapshot.val());
            this.setState({ objectID: snapshot.val().id });
        })
        firebase.database().ref("/public").on('value', (snapshot) => {
            var keys = Object.keys(snapshot.val());
            var fetchedItems = JSON.parse(JSON.stringify(snapshot.val()));
            if (fetchedItems) {
                var array = [];
                console.log(typeof fetchedItems);
                keys.map(function (value) {
                    var snapshotItem = snapshot.val()[value];
                    if (snapshotItem) {
                        var item = {
                            id: snapshotItem.id,
                            json: {
                                name: snapshotItem.name,
                                quantity: snapshotItem.quantity,
                            }
                        }
                        array.push(item);
                    }
                });
                this.setState({ objects: array });
            }
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ItemListView
                    items={this.state.items}
                    addItem={() => this.addItem()}
                    changeQuantity={(item, id) => this.changeQuantity(item, id)}
                    deleteItem={(id) => this.deleteItem(id)}
                />
                <ItemModal popupHidden={this.state.popupHidden} cancelAdd={this.cancelAdd} addItem={(itemJSON) => this.addItemToBase(itemJSON)} />
            </View>
        )
    }

    navigationOptions = ({ navigation }) => ({
        headerRight: (
            <TouchableOpacity onPress={() => this.addItem()}>
                <Image source={require('../../assets/images/add_item.png')} style={{ width: 24, height: 24, marginRight: 16 }} />
            </TouchableOpacity>
        ),
    })

    addItem() {
        this.setState({ popupHidden: false });
    }

    deleteItem(id) {
        let itemPath = "/public/" + id;
        firebase.database().ref(itemPath).remove();
    }

    addItemToBase(itemJSON) {
        this.setState({ popupHidden: true });
        var itemID = this.state.objectID;
        let itemPath = "/public/" + itemID;
        firebase.database().ref(itemPath).set({
            id: itemID,
            name: itemJSON.name,
            quantity: +itemJSON.quantity
        });
        firebase.database().ref("/publicID").set({
            id: this.state.objectID + 1
        })
    }

    cancelAdd() {
        this.setState({ popupHidden: true });
    }

    changeQuantity(item, id) {
        let itemPath = "/public/" + id;
        return firebase.database().ref(itemPath).set({
            id: id,
            name: item.name,
            quantity: item.quantity
        })
    }
}

class ItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addingActive: false,
            itemName: '',
            itemQuantity: '',
        }
        this.cancelAdd = this.cancelAdd.bind(this);
        this.addItemJSON = this.addItemJSON.bind(this);
        this.itemQuantityChanged = this.itemQuantityChanged.bind(this);
        this.itemNameChanged = this.itemNameChanged.bind(this);
    }
    render() {
        if (this.props.popupHidden) {
            return (null);
        } else {
            return (
                <KeyboardAvoidingView style={styles.itemModalViewContainer}>
                    <KeyboardAvoidingView style={styles.visibleModalView}>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>
                                Nom du produit
                            </Text>
                            <TextInput
                                autoCapitalize="sentences"
                                placeholder="Nom du produit"
                                onChangeText={(value) => this.itemNameChanged(value)}
                                value={this.state.itemName} />
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>
                                Quantité
                            </Text>
                            <TextInput
                                keyboardType="numeric"
                                placeholder="Quantité"
                                onChangeText={(value) => this.itemQuantityChanged(value)}
                                value={this.state.itemQuantity}
                            />
                        </View>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelAdd} onPress={() => this.cancelAdd()}>
                                <Text>Annuler</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.addButton, this.state.addingActive ? styles.addButtonActive : styles.addButtonInactive]}
                                disabled={!this.state.addingActive}
                                onPress={() => this.addItemJSON()}>
                                <Text style={{ color: 'white', fontWeight: 'bold', }}>Ajouter</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </KeyboardAvoidingView>
            );
        }
    }
    cancelAdd() {
        this.setState({
            itemName: '',
            itemQuantity: ''
        });
        this.props.cancelAdd();
    }
    addItemJSON() {
        this.setState({
            itemName: '',
            itemQuantity: ''
        });
        var itemJSON = {
            name: this.state.itemName,
            quantity: this.state.itemQuantity
        }
        this.props.addItem(itemJSON);
    }
    itemQuantityChanged(value) {
        if (value.length === 0) {
            this.setState({
                itemQuantity: '',
                addingActive: false
            });
        } else {
            this.setState({ itemQuantity: value });
            if (this.state.itemName.length !== 0) {
                this.setState({ addingActive: true });
            } else {
                this.setState({ addingActive: false });
            }
        }
        console.log(this.state);
    }
    itemNameChanged(value) {
        if (value.length === 0) {
            this.setState({
                itemName: '',
                addingActive: false
            });
        } else {
            if (this.state.itemQuantity.length !== 0) {
                this.setState({
                    itemName: value,
                    addingActive: true
                });
            } else {
                this.setState({
                    itemName: value,
                    addingActive: false
                });
            }
        }
    }
}

const styles = StyleSheet.create({
    itemModalViewContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
    visibleModalView: {
        backgroundColor: 'white',
        marginRight: 80,
        marginLeft: 80,
        height: 240,
        padding: 20,
        paddingBottom: 0,
        paddingTop: 0,
        borderRadius: 10,
        justifyContent: 'space-evenly'
    },
    modalButtons: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    cancelAdd: {
        margin: 10,
    },
    addButton: {
        padding: 10,
        borderRadius: 4,
    },
    addButtonActive: {
        backgroundColor: 'green',
    },
    addButtonInactive: {
        backgroundColor: 'lightgrey',
    }

});