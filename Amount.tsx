import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { List, IconButton, Button } from 'react-native-paper';
import { Text, View, StyleSheet } from 'react-native'

function Amount({ id, amount, edit }) {
  async function addAmount() {
      amount++;
      console.log(id, amount);
      await firestore()
        .collection('stock')
        .doc(id)
        .update({
          amount: amount,
        });
    }

    async function subtractAmount() {
      amount--;
      console.log(id, amount);
      await firestore()
        .collection('stock')
        .doc(id)
        .update({
          amount: amount,
        });
    }

  return (
    <>
      { edit && amount > 0 && (
        <Button style={styles.amountButtons} contentStyle={styles.amountButtonsInner} compact={true} mode="outlined" onPress={() => subtractAmount()}>
          <Text>-</Text>
        </Button>
      ) }
      <Text style={{textAlignVertical: 'center', marginLeft: 20}}>{amount}</Text>
      { edit && (
        <Button style={styles.amountButtons} contentStyle={styles.amountButtonsInner} compact={true} mode="outlined" onPress={() => addAmount()}>
          <Text>+</Text>
        </Button>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  amountButtons: {
    marginLeft: 20,
    height: 20
  },
  amountButtonsInner: {
    paddingVertical: 0,
    marginVertical: -12
  }
});

export default React.memo(Amount);