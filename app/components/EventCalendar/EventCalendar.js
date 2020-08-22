import * as React from 'react';
import { View, Text, Button, StyleSheet, Picker } from 'react-native';
import { Calendar } from 'react-native-calendars';

const colors = [
  'blue',
  'red',
  'orange',
  'green',
  'purple',
  'pink',
  'cyan',
  'b'
];

export default class EventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      userName: '',
      selected: '',
      duration: '',
      notes: '',
      isLoaded: false,
      events: [],
      markedDates: {},
      dateMap: [],
      eventTypes: [],
      filter: 'all'
    };
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    fetch('http://192.168.1.18:8080/events/calendarData')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            events: result,
            markedDates: result.dateMap,
            dateMap: result.dateMap,
            eventTypes: result.eventTypeList
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  pickerItem(labelText, value) {
    return <Picker.Item label={labelText} value={value} key={value} />;
  }

  changeFilter(filter) {
    this.setState({ filter: filter });
    this.filterValues(filter);
    this.forceUpdate();
  }

  filterValues(filter) {
    if (filter == 'all') {
      this.setState({
        markedDates: JSON.parse(JSON.stringify(this.state.dateMap))
      });
    } else {
      var map = JSON.parse(JSON.stringify(this.state.dateMap));
      var newMap = {};
      for (var key in map) {
        var value = map[key];
        var dots = value.dots;
        var newDots = [];
        newDots = dots.filter(function(dot) {
          return dot.key == filter;
        });
        if (newDots.length > 0) {
          value.dots = newDots;
          newMap[key] = value;
        }
        console.log(newMap);
      }
      this.setState({
        markedDates: newMap
      });
    }
  }

  render() {
    return (
      <View style={styles.eventCalendarWrapper}>
        <View style={styles.filterContainer}>

            <Picker
                selectedValue={this.state.filter}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.changeFilter(itemValue)}
                itemStyle={styles.pickerItem}
            >
              <Picker.Item label="all" value="all" />
              {this.state.eventTypes.map(type =>
                  this.pickerItem(type.key, type.key)
              )}
            </Picker>

        </View>

        <Calendar
          markingType={'multi-dot'}
          markedDates={this.state.markedDates}
        />
        <Button onclick={() => this.fetchEvents()} title="Reload data" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendarWrapper: {
    // padding: 20,
    // margin: 20
  },
  filterContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  eventCalendarWrapper: {
    width: '100%',
    backgroundColor: 'white'
    // borderWidth: 5,
    // borderColor: '#1d697c',
  },
  typeFilter: {
    padding: 10,
    fontSize: 14,
    backgroundColor: 'white',
    alignSelf: 'center'
  },
  eventCalendarHeader: {
    padding: 20,
    fontSize: 20,
    width: '100%',
    textAlign: 'center'
  },
  picker: {
    // flex:.5,
    width: '50%',
    // padding: 10,
    height: 50,
    alignSelf: 'flex-end',
    // color: "#1d697c",
    fontWeight: 'bold',
  },
  pickerContainer: {
    width: '100%'
  },
  pickerItem : {
    backgroundColor: "#1d697c",
    fontWeight: 'bold',
    fontSize: 15,
    height: 50,
    alignSelf: 'flex-end'
  },
  filter : {
    width: '50%',
    height: 50,
  }
});
