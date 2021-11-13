import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, TouchableHighlight, Dimensions, Text } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useTaskContext } from '../contexts/TaskContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const window = Dimensions.get("window");

const CreateTaskDetail = ({item=null, navigation}) => {
    const { tasks } = useTaskContext();
    const [taskName, setTaskName] = useState(item?.taskName ? item.taskName : '');
    const [taskDetail, setTaskDetail] = useState(item?.taskDetail ? item.taskDetail : '');
    const [taskDate, setTaskDate] = useState(item?.taskDate ? item.taskDate : new Date());
    const [show, setShow] = useState(false);

    const handleDate = (e, date) => {
        setShow(false);
        date ? setTaskDate(date) : null
    }

    const handleSave = () => {
        if (item) {
            let updatedItem = {...item}
            updatedItem.taskName = taskName
            updatedItem.taskDetail = taskDetail
            updatedItem.taskDate = taskDate

            updatedItem.taskName? (tasks.updateItem(updatedItem), navigation.goBack()) : alert('A name is required')
        } else {
            let newItem = {}
            newItem.taskName = taskName
            newItem.taskDetail = taskDetail
            newItem.taskDate = taskDate

            newItem.taskName ? (tasks.setItem(newItem), navigation.goBack()) : alert('A name is required')
        }
    }

    return ( 
        <>
            <View style={styles.container}>
                <TextInput 
                    style={styles.taskTitle}
                    placeholder={'My Task'}
                    value={taskName}
                    onChangeText={(text) => setTaskName(text)}
                />
                <View style={styles.taskSubTitle}>
                    <MaterialCommunityIcons  name="text" size={24} color="black" />
                    <TextInput 
                        placeholder={'Details'}
                        value={taskDetail}
                        multiline={true}
                        style={{marginHorizontal: 20, fontSize: 20, width: '100%'}}
                        onChangeText={(text) => setTaskDetail(text)}
                    />
                </View>
                <TouchableWithoutFeedback onPress={() => setShow(true)}>
                    <View style={styles.taskSubTitle}>
                        <AntDesign  name="calendar" size={24} color="black" />
                        <TextInput
                            placeholder={'Date'}
                            value={tasks.formatDate(taskDate, true)}
                            editable={false}
                            style={{marginHorizontal: 20, fontSize: 14, color: 'black'}}
                        />
                    </View>
                </TouchableWithoutFeedback>
                {show && <DateTimePicker
                            mode={'date'}
                            value={new Date(taskDate)}
                            display="default"
                            onChange={handleDate}
                        />
                }
            </View>
            <TouchableHighlight style={styles.buttonContainer} onPress={handleSave} underlayColor = '#259af3'>
                <Text style={styles.button}>Save Task</Text>
            </TouchableHighlight>
        </>
     );
}
 

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F7',
        width: '100%',
        minHeight: '100%',
    },
    taskTitle: {
        height: "auto",
        margin: 12,
        padding: 10,
        fontSize: 32,
    },
    taskSubTitle: {
        height: "auto",
        margin: 12,
        marginVertical: 0,
        padding: 10,
        flexDirection: 'row',
    },
    buttonContainer: {
        backgroundColor: '#1E81CF',
        position: 'absolute',
        width: '100%',
        height: 50,
        left: 0,
        top: window.height - 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    }
});
export default CreateTaskDetail;