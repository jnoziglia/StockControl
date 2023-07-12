import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Appbar, TextInput, Button, IconButton, MD3Colors } from 'react-native-paper';
import Item from './Item';

const Stock = ({navigation}) => {
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectMode, setSelectMode] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
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

  const toggleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  useEffect(() => {
    console.log('Do something after selectedItems has changed', selectedItems);
    if (selectedItems.length) {
      setSelectMode(true);
    }
    else {
      setSelectMode(false);
    }
  }, [selectedItems]);


  useEffect(() => {
              console.log('Do something after selectMode has changed', selectMode);
           }, [selectMode]);

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

  editButton = edit ? <Appbar.Action icon='check' onPress={() => setEdit(false)} /> : <Appbar.Action icon='border-color' onPress={() => setEdit(true)} />;

  return (
    <>
      <Appbar>
        <Appbar.Content title={'Stock'} />
        {editButton}
        <Appbar.Action icon='cart-outline' onPress={() => navigation.navigate('Shopping', {list: stock})} />
      </Appbar>
      <FlatList
        style={{flex: 1}}
        data={stock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item {...item} edit={edit} selectMode={selectMode} selected={selectedItems.includes(item.id)} onItemPress={toggleSelect} />}
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