import * as React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import AddEventForm from "../AddEventForm/AddEventForm";

export default function AddEvent({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <ScrollView>
                <AddEventForm />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    },
});