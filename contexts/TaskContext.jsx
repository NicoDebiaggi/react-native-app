import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react'
import useAsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext()

export const useTaskContext = () => useContext(Context)

export const TaskProvider = ({ children }) => {
    const [items, setItems] = useState([])

    const tasks = {}

    tasks.items = items;

    tasks.getItems = async () => {
        await useAsyncStorage.getItem("items", (err, result) => {
            if (err) {
                console.error(err)
            }
            else {
                setItems([...JSON.parse(result)])
            }
        });
    },

    tasks.setItem = (task) =>  {
        let id = tasks.generateId()
        let newTask = { id: id, isCompleted: false, ...task }

        setItems([...items, newTask])
    },

    tasks.removeItem = (task) =>  {
        let newItems = items.filter(i => i.id !== task.id)

        setItems(newItems)
    }

    tasks.updateItem = (task) => {
        setItems(items.map(item => item.id === task.id ? task : item))
    }

    tasks.formatDate = (newDate, year) => {
        const months = {
            0: 'Jan',
            1: 'Feb',
            2: 'Mar',
            3: 'Apr',
            4: 'May',
            5: 'Jun',
            6: 'Jul',
            7: 'Aug',
            8: 'Sep',
            9: 'Oct',
            10: 'Nov',
            11: 'Dec'
        }
        let date = new Date(newDate)
        let formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${year ? date.getFullYear() : ''}`

        return formattedDate
    }

    tasks.generateId = () => (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()

    useEffect(async() => {
        return await useAsyncStorage.setItem("items", JSON.stringify(items), (err) => {
            if (err) {
                console.error(err)
            }
        }); 
    }, [items])

    return (
        <Context.Provider value={{tasks}}>
            {children}
        </Context.Provider>
    )
}