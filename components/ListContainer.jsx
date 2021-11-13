import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTaskContext } from '../contexts/TaskContext';
import ListItem from './ListItem';

const ListContainer = ({navigation}) => {
    const { tasks } = useTaskContext()

    useEffect(() => {
        (tasks.items.length == 0) && tasks.getItems()
    }, [])

    const scrollRef = useRef(null)

    return ( 
        <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
            {
                (tasks.items.length != 0)
                ?
                tasks.items.map((item) => {
                    return (
                        <ListItem simultaneousHandlers={scrollRef} key={item.id} item={item} navigation={navigation}/>
                    )
                })
                : null
            }
        </ScrollView>
     );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F7',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 100,
        width: '100%',
        position: 'absolute',
        top: 0,
    },
});
 
export default ListContainer;