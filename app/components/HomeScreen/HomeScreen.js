import * as React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Event Tracker </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 100,
        color: '#1d697c',
        fontWeight: 'bold'
    },
    container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    button: {width: '20%', padding: 10}
});