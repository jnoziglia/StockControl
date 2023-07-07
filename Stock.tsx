import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Appbar, TextInput, Button } from 'react-native-paper';
import Item from './Item';

function Stock() {
  const [ item, setItem ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ loading, setLoading ] = useState(true);
  const [ stock, setStock ] = useState([]);
  const [ edit, setEdit ] = useState(false);
  const ref = firestore().collection('stock');

  let editButton;

  async function addItem() {
    if (item === '' || amount === '') {
      return;
    }
    await ref.add({
      name: item,
      amount: parseInt(amount)
    });
    setItem('');
    setAmount('');
  }

  async function addAmount(id, amount) {
    amount++;
    console.log(id, amount);
    await firestore()
      .collection('stock')
      .doc(id)
      .update({
        amount: amount,
      });
  }

  async function subtractAmount(id, amount) {
    amount--;
    console.log(id, amount);
    await firestore()
      .collection('stock')
      .doc(id)
      .update({
        amount: amount,
      });
  }

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
        querySnapshot.forEach(doc => {
          const { name, amount } = doc.data();
          list.push({
            id: doc.id,
            name,
            amount,
          });
        });

        setStock(list);

        if (loading) {
          setLoading(false);
        }
    });
  }, []);

  if (loading) {
    return null; // or a spinner
  }

  if (edit) {
    editButton = <Appbar.Action icon='check' onPress={() => setEdit(false)} />;
  }
  else {
    editButton = <Appbar.Action icon='border-color' onPress={() => setEdit(true)} />;
  }

  return (
    <>
      <Appbar>
        <Appbar.Content title={'Stock'} />
        {editButton}
      </Appbar>
      <FlatList
        style={{flex: 1}}
        data={stock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item {...item} edit={edit} onMinusPress={() => subtractAmount(item.id, item.amount)} onPlusPress={() => addAmount(item.id, item.amount)} />}
      />
      <View style={styles.inputWrap}>
        <TextInput style={styles.itemInput} label={'New Item'} value={item} onChangeText={setItem} />
        <TextInput
          style={styles.amountInput}
          label={'New Item'}
          value={amount}
          onChangeText={setAmount}
          keyboardType='numeric'
        />
      </View>
      <Button onPress={() => addItem()}>Add Item</Button>
    </>
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row'
  },
  itemInput: {
    flex: 3,
  },
  amountInput: {
    flex: 1,
  }
});

export default Stock;