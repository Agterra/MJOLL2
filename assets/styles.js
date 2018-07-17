import React from 'react';
import { 
        StyleSheet
 } from 'react-native';

 export const modalStyle = StyleSheet.create({
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