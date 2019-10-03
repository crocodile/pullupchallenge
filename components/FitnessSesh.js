import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


function FitnessSesh({ id, name, date, amount }) {

    return (
        <View style={styles.container}>
            <Image source={require('../images/pull-up.png')} style={styles.sesh_image} />
            <View style={styles.mid_container}>
                <Text style={styles.name_text}>{name}</Text>
                <Text style={styles.date_text}>{date.toUTCString()}</Text>
            </View>
            <View style={styles.count_container}>
                <Text style={styles.count}>{amount}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 8,
        borderRadius: 4,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    sesh_image: {
        width: 40,
        height: 40,
    },
    mid_container: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 8,
    },
    name_text: {
        fontSize: 16,
    },
    date_text: {
        fontSize: 12,
    },
    count_container: {
        justifyContent: 'center',
    },
    count: {
        fontSize: 21,
        height: 40,
        marginLeft: 8,
        paddingRight: 8,
        paddingLeft: 8,
        textAlign: 'right',
        lineHeight: 40,
    }
});

export default React.memo(FitnessSesh);