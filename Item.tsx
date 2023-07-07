import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { List, IconButton, Button } from 'react-native-paper';
import { Text, View } from 'react-native'

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
        right={props => <Amount {...props} amount={amount} edit={edit} onMinusPress={onMinusPress} onPlusPress={onPlusPress} />}
      />
    </>
  );
}

function Amount({ amount, edit, onMinusPress, onPlusPress }) {
  return (
    <>
      { edit && amount > 0 && (
        <Button mode="elevated" onPress={() => onMinusPress()}>
          -
        </Button>
      ) }
      <Text style={{textAlignVertical: 'center'}}>{amount}</Text>
      { edit && (
        <Button mode="elevated" onPress={() => onPlusPress()}>
          +
        </Button>
      )}
    </>
  );
}

export default React.memo(Item);