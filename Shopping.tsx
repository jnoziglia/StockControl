import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Appbar, TextInput, Button, IconButton, MD3Colors } from 'react-native-paper';
import Item from './Item';

const Shopping = ({navigation, route}) => {
  const [ shoppingList, setShoppingList ] = useState([]);

  let list = route.params.list;
  list = list.filter(item => item.amount <= 1).sort((a, b) => a.amount - b.amount);

  return (
    <>
      <Appbar>
        <Appbar.Content title={'Shopping List'} />
      </Appbar>
      <FlatList
        style={{flex: 1}}
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item {...item} />}
      />
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

export default Shopping;