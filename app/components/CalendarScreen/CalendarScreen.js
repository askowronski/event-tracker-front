import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {EventCalendarContainerConatiner} from "../../../platform/eventCalendar/eventCalendarContainerComponent";

export default function CalendarScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <EventCalendarContainerConatiner />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 100,
    color: '#1d697c',
    fontWeight: 'bold'
  },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: { width: '20%', padding: 10 }
});
