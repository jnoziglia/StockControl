import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { List, IconButton, Button } from 'react-native-paper';
import { Text, View } from 'react-native'

function Item({ id, name, amount }) {
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
      />
    </>
  );
}

export default React.memo(Item);