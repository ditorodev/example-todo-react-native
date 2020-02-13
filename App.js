/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import {
  FlatList,
  View,
  Switch,
  TextInput,
  Text,
  Button
} from 'react-native';

const DATA = [
  {name: 'Example ' + Math.floor(Math.random() * 10), valid: false},
  {name: 'Example ' + Math.floor(Math.random() * 10), valid: false},
  {name: 'Example ' + Math.floor(Math.random() * 10), valid: false},
  {name: 'Example ' + Math.floor(Math.random() * 10), valid: false},
  {name: 'Example ' + Math.floor(Math.random() * 10), valid: false},
  {name: 'Example ' + Math.floor(Math.random() * 10), valid: false},
  {name: 'Example ' + Math.floor(Math.random() * 10), valid: false},
  {name: 'Example ' + Math.floor(Math.random() * 10), valid: false},
  {name: 'Example ' + Math.floor(Math.random() * 10), valid: false},
  {name: 'Example ' + Math.floor(Math.random() * 10), valid: false},
  {name: 'Example ' + Math.floor(Math.random() * 10), valid: false},
  {name: 'Example ' + Math.floor(Math.random() * 10), valid: false},
  {name: 'Example ' + Math.floor(Math.random() * 10), valid: false}
];

const EditTodo = ({value, setter}) => {
  const [newValue, setNewValue] = useState(value);

  return (
    <TextInput style={styles.textField} value={newValue} onChangeText={setNewValue} onSubmitEditing={() => {
      setter(newValue);
    }}/>
  )
}

// EditTodo.propTypes={
//   value: PropTypes.string,
//   index: PropTypes.number
// };

const App =  () => {
  const [data, setData] = useState(DATA);
  const [newTodo, setNewTodo] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const toggleTodo = (index, value) => {
      setData((state) => {
        const newState = [...state];
        newState[index].valid = value;
        return newState;
      })
  };

  const newTodoHandler = () => {
    setData((state) => {
      return [...state, {name: newTodo, valid: false}]
    });
  }

  const editTodo = (value, index) => {
    setData((state) => {
      return state.map((todo, i) => i === index ? ({...todo, name: value}) : todo);
    })
  }

  return (
    <View>
      <TextInput style={styles.textField} value={newTodo} onChangeText={setNewTodo} onSubmitEditing={() => {
        newTodoHandler();
        setNewTodo(null);
      }}> </TextInput>
      <FlatList
        style={styles.container}
        data={data}
        renderItem={({item, index}) => {
          return (editMode ? <View style={{flexDirection: 'column'}}>
            <EditTodo item={item} index={index} setter={(value) => {
              editTodo(value, index);
              setEditMode(false);
            }}/>
          </View>: (
            <View style={{flexDirection: 'column'}}>
              <Switch value={item.valid} onValueChange={(value) => toggleTodo(index, value)}/>
              <Text style={styles.text}>{item.name}</Text>
              <Button title={'Edit'} onPress={() => setEditMode(true)}/>
            </View>
          ))
        }}
      />
    </View>
  );
}

const styles = StyleSheet({
  container :{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },

  text: {
    color: 'white'
  },

  textField: {
    margin: 10
  }
});


export default App;
