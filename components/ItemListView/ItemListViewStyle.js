import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    mainViewContainer: {
        flex: 1,
        backgroundColor: 'lightgrey'
    },
    pageTitleView: {
        alignItems: 'center',
        height: 60,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    pageTitleText: {
        flex: 1,
        color: 'white',
        textAlign: 'left',
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 24,
    },
    pageTitleAddActionIcon: {
        width: 24,
        height: 24,
        marginRight: 20
    },
    cellView: {
        backgroundColor: 'blue',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        minHeight: 80,
        backgroundColor: 'white',
        marginBottom: 1,
        padding: 10,
    },
    operationsView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    itemText: {
        textAlign: 'left',
        flex: 1,
        marginLeft: 20,
        fontSize: 20,
    },
    operationButtons: {
        width: 30,
        height: 30,
        backgroundColor: 'lightgrey',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    }
});