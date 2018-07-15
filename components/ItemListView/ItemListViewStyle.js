import {
    StyleSheet
} from 'react-native';

export const ListStyle = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
});

export const CellStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    quantityView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        margin: 10
    },
    textZone: {
        flex: 1
    }
});