import React, { useEffect, useState } from 'react';
import { useTaskContext } from '../contexts/TaskContext';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Entypo } from '@expo/vector-icons';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const LIST_ITEM_HEIGHT = 70;
const LIST_ITEM_MARGIN = 10;
const TRANSLATE_X_TRESHOLD = -SCREEN_WIDTH * 0.3;

const ListItem = ({item, navigation, simultaneousHandlers}) => {
    const [localItem, setlocalItem] = useState(item);
    const { tasks } = useTaskContext()

    useEffect(() => {
        setlocalItem(item)
    }, [item])
    
    useEffect(() => {
        tasks.updateItem(localItem)
    }, [localItem])
    
    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
    const itemMargin = useSharedValue(LIST_ITEM_MARGIN);
    const opacity = useSharedValue(1);
    
    const panGesture = useAnimatedGestureHandler({
        onActive: (e) => {
            translateX.value = e.translationX
        },
        onEnd: (e) => {
            if (e.translationX < TRANSLATE_X_TRESHOLD) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                itemMargin.value = withTiming(0);
                opacity.value = withTiming(0, undefined, () => {
                    runOnJS(tasks.removeItem)(localItem) 
                });
            } else {
                translateX.value = withTiming(0);
            }    
        }
    })
    
    const rStyle = useAnimatedStyle(() => ({
        transform: [{
            translateX: translateX.value
        }]
    }))
    const rIconStyle = useAnimatedStyle(() => {
        const opacity = (0 + Math.abs(translateX.value / (SCREEN_WIDTH * 0.5)));

        return { opacity }
    })
    const rContainerStyle = useAnimatedStyle(() => {
        return { 
            height: itemHeight.value,
            margin: itemMargin.value,
            opacity: opacity.value,
        }
    })
    
    return (
        <TouchableWithoutFeedback onPress={() => {
            navigation.navigate('Create Task', {
                title: 'Edit Task',
                item: localItem,
                })}
        }> 
        <Animated.View style={[styles.itemContainer, rContainerStyle]}>
                <PanGestureHandler simultaneousHandlers={simultaneousHandlers} onGestureEvent={panGesture}>
                    <Animated.View key={localItem.id} style={[styles.listItem, rStyle]}>
                        <View style={styles.taskContainer}>
                            <Checkbox
                                value={localItem.isCompleted}
                                color={'#1E81CF'}
                                onValueChange={() => {
                                    setlocalItem({...localItem, isCompleted: !localItem.isCompleted})
                                }}  
                            />
                            <Text style={localItem.isCompleted ? styles.doneTitle : styles.taskTitle}>{localItem.taskName}</Text>
                        </View>
                        <Text style={styles.taskDate}>{tasks.formatDate(localItem.taskDate, false)}</Text>
                    </Animated.View>
                </PanGestureHandler>
                <Animated.View style={[styles.deleteContainer, rIconStyle]}>
                    <Entypo name="trash" size={24} style={styles.trashIcon} />
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback> 
    );
}


const styles = StyleSheet.create({
    itemContainer: {
        width: '90%',
    },
    listItem: {
        backgroundColor: '#fff',
        height: LIST_ITEM_HEIGHT,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,

        elevation: 15,
    },
    taskContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskTitle: {
        fontSize: 18,
        color: '#444',
        fontWeight: '500',
        marginLeft: 20,
    },
    doneTitle: {
        fontSize: 18,
        color: '#777',
        fontWeight: '500',
        marginLeft: 20,
        textDecorationLine: 'line-through'
    },
    taskDate: {
        fontSize: 13,
        color: '#222',
        fontWeight: 'bold',
    },
    deleteContainer: {
        width: LIST_ITEM_HEIGHT,
        height: LIST_ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: '5%',
    },
    trashIcon: {
        color: '#f50d0d',
    }
});
 
export default ListItem;