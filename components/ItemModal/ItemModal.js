import React, { Component } from 'react';
import {
        KeyboardAvoidingView,
        Text,
        TouchableOpacity,
        View,
        TextInput
} from 'react-native';
import {modalStyle} from '../../assets/styles';

export default class ItemModal extends Component {
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
                                <KeyboardAvoidingView style={modalStyle.itemModalViewContainer}>
                                        <KeyboardAvoidingView style={modalStyle.visibleModalView}>
                                                <View>
                                                        <Text style={{ fontWeight: 'bold' }}>
                                                                Nom du produit
                                                        </Text>
                                                        <TextInput
                                                                autoCapitalize="sentences"
                                                                placeholder="Nom du produit"
                                                                onChangeText={(value) => this.itemNameChanged(value)}
                                                                value={this.state.itemName} 
                                                                style={{height: 40}}/>
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
                                                                style={{height: 40}}
                                                        />
                                                </View>
                                                <View style={modalStyle.modalButtons}>
                                                        <TouchableOpacity style={modalStyle.cancelAdd} onPress={() => this.cancelAdd()}>
                                                                <Text>Annuler</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                                style={[modalStyle.addButton, this.state.addingActive ? modalStyle.addButtonActive : modalStyle.addButtonInactive]}
                                                                disabled={!this.state.addingActive}
                                                                onPress={() => this.addItemJSON()}>
                                                                <Text style={{ color: 'white', fontWeight: 'bold', width: 60 }}>Ajouter</Text>
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
                var itemJSON = {
                        name: this.state.itemName,
                        quantity: this.state.itemQuantity
                }
                if(this.props.updatePopup) {
                        this.props.updateItem(this.props.updateID, itemJSON);
                } else {
                        this.props.addItem(itemJSON);
                }
                this.setState({
                        itemName: '',
                        itemQuantity: ''
                });
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