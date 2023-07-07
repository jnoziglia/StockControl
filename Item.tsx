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
        right={props => <Amount {...props} id={id} name={name} amount={amount} />}
      />
    </>
  );
}

function Amount({ id, name, amount }) {
  return (
    <>
      <Button mode="elevated" onPress={() => console.log('Pressed')}>
        -
      </Button>
      <Text style={{textAlignVertical: 'center'}}>{amount}</Text>
      <Button mode="elevated" onPress={() => console.log('Pressed')}>
        +
      </Button>
    </>
  );
}

export default React.memo(Item);