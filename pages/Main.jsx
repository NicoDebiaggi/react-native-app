import React from 'react';
import { StyleSheet, View } from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ListContainer from '../components/ListContainer';


export default function Main({ navigation }) {
  return (
      <View style={styles.container}>
          <Header text={"My Task "} showNumber={true}/>
          <ListContainer navigation={navigation}/>
          <Footer navigation={navigation}/>
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