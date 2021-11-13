import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTaskContext } from '../contexts/TaskContext';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ text="Change the default text", showNumber=false, goBack=false, navigation }) => {
    const { tasks } = useTaskContext();

    return ( 
        <View style={styles.header}>
            { 
                goBack &&   <Ionicons name="ios-arrow-back" style={styles.goBack} onPress={() => navigation.goBack()}/>
            }
            <Text style={styles.title}>{text}
            { 
                showNumber && <View style={styles.totalTasks}><Text>{tasks.items?.length}</Text></View>
            }   
            </Text>
        </View>
     );
}
 
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F5F5F7',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    title: {
      textAlign: 'center',
      marginTop: 30,
      fontSize: 25,
      marginBottom: 20,
    },
    totalTasks: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D5D7E3',
        borderRadius: 30/2,
    },
    goBack: {
        fontSize: 30,
        color: 'black',
        position: 'absolute',
        top: 33,
        left: 20,
    }
});

export default Header;