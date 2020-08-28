import * as React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  CheckBox
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import DateTimeWrapper from '../../app/components/DateTimeWrapper/DateTimeWrapper';

export class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.failToastRef = React.createRef();
    this.successToastRef = React.createRef();
    this.state = {
      startTimeNumbers: {
        selectedHours: 12,
        selectedMinutes: 12
      },
      endTimeNumbers: {
        selectedHours: 12,
        selectedMinutes: 12
      },
      startTimeDate: new Date(),
      endTimeDate: new Date(),
      startTimeString: '',
      endTimeString: ''
    };
  }

  changeStartTime = (hours, minutes) => {
    this.setState({
      startTimeNumbers: {
        selectedHours: hours,
        selectedMinutes: minutes
      }
    });

    this.handleDateSquashAndUpdate(
      this.state.startTimeString,
      minutes,
      hours,
      'startTime'
    );
  };

  changeEndTime = (hours, minutes) => {
    this.setState({
      endTimeNumbers: {
        selectedHours: hours,
        selectedMinutes: minutes
      }
    });
    this.handleDateSquashAndUpdate(
      this.state.endTimeString,
      minutes,
      hours,
      'endTime'
    );
  };

  changeStartDate = dateString => {
    this.handleDateSquashAndUpdate(
      dateString,
      this.state.startTimeNumbers.selectedMinutes,
      this.state.startTimeNumbers.selectedHours,
      'startTime'
    );

    this.setState({
      startTimeString: dateString
    });
  };

  changeEndDate = dateString => {
    this.handleDateSquashAndUpdate(
      dateString,
      this.state.endTimeNumbers.selectedMinutes,
      this.state.endTimeNumbers.selectedHours,
      'endTime'
    );

    this.setState({
      endTimeString: dateString
    });
  };

  handleDateSquashAndUpdate(dateString, minutes, hours, timeType) {
    var newDateString = this.formatDateString(dateString);
    let newDate = new Date(newDateString);
    newDate.setMinutes(minutes);
    newDate.setHours(hours);
    this.props.handleChange(timeType, newDate);
  }

  formatDateString(dateString) {
    var year = dateString.split('-')[0];
    var month = dateString.split('-')[1];
    var day = dateString.split('-')[2];

    var newDateString = month + '-' + day + '-' + year;
    return newDateString;
  }

  renderEndTime() {
    if (!this.props.isOnGoing) {
      return (
        <DateTimeWrapper
          changeDate={this.changeEndDate}
          startTime={this.state.endTimeNumbers}
          selected={this.state.endTimeString}
          changeTime={this.changeEndTime}
          labelText="End Date"
        />
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.eventFormContainer}>
        <Toast
          ref={this.failToastRef}
          style={{ backgroundColor: 'red' }}
          position="top"
          positionValue={10}
        />
        <Toast
          ref={this.successToastRef}
          style={{ backgroundColor: 'green' }}
          position="top"
          positionValue={10}
        />
        <View>
          <Text style={styles.inputLabel}>Event Name</Text>
          <TextInput
            onChangeText={text => this.props.handleChange('eventName', text)}
            style={styles.textInput}
            value={this.props.eventName}
          />
        </View>

        {/*<View>*/}
        {/*    <Text style={styles.inputLabel}>Username</Text>*/}
        {/*    <TextInput*/}
        {/*        onChangeText={text => this.props.handleChange(*/}
        {/*            'userName', text)}*/}
        {/*        style={styles.textInput}*/}
        {/*        value={this.props.userName}*/}
        {/*    />*/}
        {/*</View>*/}
        <View>
          <Text style={styles.inputLabel}>Type</Text>
          <TextInput
            onChangeText={text => this.props.handleChange('type', text)}
            style={styles.textInput}
            value={this.props.type}
          />
        </View>

        <View>
          <Text style={styles.inputLabel}>Notes</Text>
          <TextInput
            onChangeText={text => this.props.handleChange('notes', text)}
            style={styles.textInput}
            value={this.props.notes}
            multiline={true}
          />
        </View>

        <Text style={styles.inputLabel}>Is On Going??</Text>
        <CheckBox
          value={this.props.isOnGoing}
          onValueChange={value => this.props.handleChange('isOnGoing', value)}
          style={styles.checkbox}
        />

        <DateTimeWrapper
          changeDate={this.changeStartDate}
          startTime={this.state.startTimeNumbers}
          selected={this.state.startTimeString}
          changeTime={this.changeStartTime}
          labelText="Start Date"
        />

        {this.renderEndTime()}

        <Button
          onPress={() => this.props.createEvent(this.props.clearInputs)}
          title="Add Event"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    width: '25%',
    backgroundColor: 'cyan'
  },
  textInput: {
    color: 'black',
    padding: 10,
    margin: 10,
    backgroundColor: 'white'
  },
  inputLabel: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  notes: {
    height: 50,
    padding: 10,
    margin: 10,
    backgroundColor: 'white'
  },
  calendarWrapper: {
    padding: 20,
    margin: 20
  },
  eventFormContainer: {
    width: '100%'
  },
  checkbox: {}
});
