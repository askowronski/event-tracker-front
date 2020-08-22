import React  from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        marginLeft: 70,
    }
})

export const EventCalendar = () => {
    return (
        <View style={styles.wrapper}>
            <Text >Event Calendar</Text>
        </View>
    )
}