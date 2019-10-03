import React, { useState, useEffect } from 'react';
import { ImageBackground, FlatList, StyleSheet, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';

import FitnessSesh from '../components/FitnessSesh';
import Barchart from '../components/Barchart';
import AddFitnessSeshModal from '../components/AddFitnessSeshModal';

const ONE_WEEK_IN_MILLIS = 604800000;

function PullUpChallenge() {

    // var sesh_dummy_data = [
    //     {
    //         id: '0',
    //         name: 'Alice',
    //         date: new Date(),
    //         amount: 200,
    //     },
    //     {
    //         id: '1',
    //         name: 'Bob',
    //         date: new Date(),
    //         amount: 200,
    //     }
    // ];

    const pullupsRef = firestore().collection('pullups');

    const [seshs, setSeshs] = useState([]);
    const [userScores, setUserScores] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal((showModal) ? false : true);

    useEffect(() => {
        return pullupsRef.onSnapshot(querySnapshot => {

            const seshList = [];
            querySnapshot.forEach(doc => {
                const { name, date, amount } = doc.data();
                seshList.push({
                    id: doc.id,
                    name,
                    date: date.toDate(),
                    amount,
                });
            });
            setSeshs(seshList);

            // Filter out records which are older than a week old.
            const cutOffDate = Date.now() - ONE_WEEK_IN_MILLIS;
            var lastSevenDaysOnlyList =
                seshList.filter(sesh => sesh['date'].getTime() > cutOffDate);
            // Sum up scores and store them in a 2D array sorted in desc. order.
            const userScoreList = Object.entries(
                lastSevenDaysOnlyList.reduce((acc, cur) => {
                    if (!acc.hasOwnProperty(cur.name)) acc[cur.name] = 0
                    acc[cur.name] += cur['amount']
                    return acc
                }, {})
            ).sort((a, b) => b[1] - a[1]);
            setUserScores(userScoreList);

        });

    }, []); // With [] as a second argument this hook is triggered exactly once.

    return (<>
        <ImageBackground
            style={styles.top_section}
            source={require('../images/active-bar-blur-1440x1120.jpeg')} >

            <View
                style={styles.title_container}>
                <Text
                    style={styles.title_small}>
                    Weekly
                </Text>
                <Text
                    style={styles.title_large}
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    PULL-UP SCORES
                </Text>
            </View>
            <Barchart
                valuePairs={userScores} />

        </ImageBackground>
        <View
            style={styles.bottom_section}>
            <FlatList
                style={styles.list_view} l
                data={seshs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <FitnessSesh {...item} />} />
        </View>
        <FAB
            style={styles.fab}
            icon="add"
            onPress={toggleModal}
            visible={!showModal} />
        <AddFitnessSeshModal
            visible={showModal}
            onDismiss={toggleModal} />
    </>);
}

const styles = StyleSheet.create({
    top_section: {
        height: 280,
        flexDirection: 'column',
        paddingTop: 16,
        paddingRight: 16,
        paddingBottom: 16,
        paddingLeft: 16,
    },
    bottom_section: {
        flex: 1
    },
    list_view: {
        paddingTop: 8,
        paddingLeft: 8,
        paddingRight: 8
    },
    title_container: {
        alignSelf: 'center',
        width: 'auto',
        marginTop: 16,
        marginBottom: 16
    },
    title_small: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
        height: 16,
        lineHeight: 16,
        justifyContent: 'center',
        textShadowRadius: 12, textShadowColor: '#371c08',
    },
    title_large: {
        justifyContent: 'center',
        alignItems: 'center',
        lineHeight: 36,
        height: 36,
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        color: '#FFFFFF',
        textShadowRadius: 16,
        textShadowColor: '#371c08',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#f9bd48'
    }
})

export default PullUpChallenge;