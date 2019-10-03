import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function Bar({ style, label, value, heightPc }) {

    return (
        <View style={[styles.container_main, style]}>
            <View style={styles.container_labelled_bar}>
                <View style={[styles.container_bar, { height: heightPc.toString() + '%' }]}>
                    <Text style={styles.bar_text}>
                        {value}
                    </Text>
                </View>
            </View>
            <Text style={styles.bar_label}
                numberOfLines={1}
                ellipsizeMode='tail'>
                {label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container_main: { // Container to
        height: '100%',
        marginLeft: 16,
        marginRight: 16,
    },
    container_labelled_bar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    container_bar: {
        borderRadius: 8,
        backgroundColor: '#FFFFFF90',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bar_text: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadowRadius: 12,
        textShadowColor: '#371c08'
    },
    bar_label: {
        marginTop: 4,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        color: '#FFFFFF',
        textShadowRadius: 10,
        textShadowColor: '#371c08'
    }
})

export default React.memo(Bar);