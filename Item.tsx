import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { List, IconButton, Button } from 'react-native-paper';
import { Text, View, StyleSheet } from 'react-native';
import Amount from './Amount';

function Item({ id, name, amount, edit, onMinusPress, onPlusPress }) {
  async function toggleComplete() {
    await firestore()
      .collection('stock')
      .doc(id)
      .update({
        amount: 0,
      });
  }

  return (
    <>
      <List.Item
        title={name}
        right={props => <Amount {...props} id={id} amount={amount} edit={edit} onMinusPress={onMinusPress} onPlusPress={onPlusPress} />}
      />
    </>
  );
}

export default React.memo(Item);