import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import EventCalendarRN from '../EventCalendar/EventCalendarRN';

export default function EventCalendarWrapper(props) {
  return (
    <View sytle={styles.calendarWrapper}>
      <EventCalendarRN style={styles.calendarWrapper} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  calendarWrapper: {
    padding: 20,
    margin: 20,
    width: '100%'
  }
});
