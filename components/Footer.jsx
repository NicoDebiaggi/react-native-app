import React from 'react';
import { View, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';


const window = Dimensions.get("window");

const Footer = ({ navigation }) => {

    return ( 
        <View style={styles.footer}>
            <TouchableHighlight style={styles.footerAdd} underlayColor = '#259af3' onPress={
                () => navigation.navigate('Create Task', {
                    title: 'Add New Task',
                    })}>
                <Entypo name="add-to-list" size={30} color="white" />
            </TouchableHighlight>
        </View>
     );
}
 
const styles = StyleSheet.create({
    footer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        width: "100%",
        height: 100,
        top: window.height - 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footerAdd: {
        textAlign: 'center',    
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 70/2,
        backgroundColor:"#1E81CF",
        shadowColor: "#000",
        shadowOffset: {
            width: 12,
            height: 12,
        },
        shadowOpacity: 1,
        shadowRadius: 50,

        elevation: 10,
    },
    footerAddText: {
        color: "#fff",
        fontSize: 30,
        margin: 0,
        padding: 0,
    }
});

export default Footer;