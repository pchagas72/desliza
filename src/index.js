import { View, Text, StyleSheet } from 'react-native'
import React {useState, useEffect} from 'react'
import {db} from '../config'
import { ref, onValue } from 'firebase/database'

const FetchData = () => {
    const data = useState([])

    useEffect(() => {
        const starCountRef = ref(db, 'example/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const newPosts = Object.keys(data).map(key => ({
                id:key,
                ...data[key]
            }))
        })
    })
    return (
        <View={styles.container}>
            <Text>FetchData</Text>
        </View>
    )
}

export default FetchData

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
