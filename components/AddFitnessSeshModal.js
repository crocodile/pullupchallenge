import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Button, Modal, TextInput } from 'react-native-paper';

import InputSpinner from "react-native-input-spinner";
import AsyncStorage from '@react-native-community/async-storage';

import firestore from '@react-native-firebase/firestore';

const USER_NAME_KEY = 'user_name_key'

function AddFitnessSeshModal({ ...props }) {

  const [name, setName] = useState('');
  const [amount, setAmount] = useState(1);

  async function saveFitnessSession() {
    await firestore()
      .collection('pullups')
      .add({ name, date: new Date(), amount })
      saveName(name);
    props.onDismiss();
  }

  async function saveName(name) {
    try {
      await AsyncStorage.setItem(USER_NAME_KEY, name);
    } catch (error) {
      console.error(error);
    }
  };

  async function retrieveName() {
    try {
      const value = await AsyncStorage.getItem(USER_NAME_KEY);
      if (value !== null) setName(value);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    retrieveName()
  },[]);

  return (<Modal {...props}>
    <View style={styles.container}>
      <Text
        style={styles.title}>YOUR PULL-UP SESH</Text>
      <TextInput
        style={{ marginTop: 32 }}
        label='Your name'
        mode='outlined'
        value={name}
        underlineColor='red'
        onChangeText={text => setName(text)} />
      <InputSpinner
        style={styles.sesh_input}
        max={7600}
        min={1}
        step={1}
        buttonFontSize={48}
        fontSize={32}
        rounded={false}
        height={70}
        color='#f9bd48'
        background='#fef6e6'
        buttonTextColor='#705727'
        inputStyle={{
          flex: 1,
          textAlignVertical: 'center',
          color: '#705727',
          fontWeight: 'bold',
          fontSize: 36,
          textAlign: 'center',
        }}
        value={amount}
        onChange={integer => setAmount(integer)}/>
      <Button
        style={styles.save_btn}
        color='#f9bd48'
        mode='contained'
        onPress={integer => saveFitnessSession()}>
        Save
            </Button>
    </View>
  </Modal>);
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    marginRight: 32,
    borderRadius: 8,
    padding: 32,
    backgroundColor: 'white',
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#705727',
    fontWeight: 'bold',
  },
  sesh_input: {
    marginTop: 28,
    alignSelf: 'center',
    width: '100%',
    height: '25%',
  },
  save_btn: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  }
});

export default React.memo(AddFitnessSeshModal);
