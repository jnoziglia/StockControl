import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { List, IconButton, Button } from 'react-native-paper';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import Amount from './Amount';

const Item = ({ id, name, amount, edit=false, selected, selectMode, onItemPress }) => {

  let touchableHighlightProps = {};
  let viewProps = {};
  if (selected) {
    viewProps.style = { backgroundColor: 'blue' };
  }

  let itemView = <View {...viewProps}>
                   <List.Item
                     title={name}
                     right={props => <Amount {...props} id={id} amount={amount} edit={edit} />}
                   />
                 </View>

  if (edit) {
    return (
      <>
        {itemView}
      </>
    );
  }
  else {
    return (
      <TouchableHighlight underlayColor="white" onLongPress={() => onItemPress(id)}>
        {itemView}
      </TouchableHighlight>
    );
  }



}

export default React.memo(Item);