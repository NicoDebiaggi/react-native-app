import React from 'react';
import { StyleSheet, View } from 'react-native';
import CreateTaskDetail from '../components/CreateTaskDetail';
import Header from '../components/Header';


export default function CreateTask({ navigation, route }) {
  const { title, item } = route.params;
  return (
    <View style={styles.container}>
      <Header text={title} goBack={true} navigation={navigation}/>
      <CreateTaskDetail item={item} navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F7',
    width: '100%',
    minHeight: '100%',
  },
});