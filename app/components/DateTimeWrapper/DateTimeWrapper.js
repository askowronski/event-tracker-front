import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TimePicker from 'react-native-simple-time-picker';
import CalendarWrapper from './CalendarWrapper';

export default function DateTimeWrapper(props) {
  return (
    <View>
      <Text style={styles.inputLabel}>{props.labelText}</Text>
      <CalendarWrapper
        onDayPress={date => props.changeDate(date)}
        markedDates={{
          [props.selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: 'orange',
            selectedTextColor: 'red'
          }
        }}
      />
      <View>
        <Text style={styles.inputLabel}>Time</Text>
        <TimePicker
          selectedHours={props.startTime.selectedHours}
          selectedMinutes={props.startTime.selectedMinutes}
          onChange={(hours, minutes) => props.changeTime(hours, minutes)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  },
  inputLabel: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold'
  }
});
