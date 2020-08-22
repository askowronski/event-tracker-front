import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import EventCalendar from '../EventCalendar/EventCalendar';

export default function CalendarWrapper(props) {
  return (
    <View sytle={styles.calendarWrapper}>
      <Calendar style={styles.calendarWrapper} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  calendarWrapper: {
    padding: 20,
    margin: 20
  }
});
