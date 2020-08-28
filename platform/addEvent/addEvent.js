import moment from 'moment';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import './addEvent.css';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateTimePicker from 'react-datetime-picker';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const eventColorLegend = {
  injury: 'red',
  run: 'green',
  'rock-ring': 'blue',
  handstand: 'yellow',
  Test: 'orange',
  test: 'orange',
  yoga: 'lightblue'
};

export class AddEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  renderButton() {
    return this.props.isEdit ? (
      <Button
        onClick={() => this.props.editEvent(this.props.closeModal)}
        style={{ backgroundColor: '#1d697c', color: 'white' }}
      >
        Edit Event
      </Button>
    ) : (
      <Button
        onClick={() => this.props.createEvent(this.props.clearInputs)}
        style={{ backgroundColor: '#1d697c', color: 'white' }}
      >
        Create Event
      </Button>
    );
  }

  render() {
    return (
      <div style={{ width: '40%', height: '100%', marginLeft: '30%' }}>
        <FormControl fullWidth>
          <TextField
            id="input-title"
            label="Outlined"
            type="text"
            label="Title"
            value={this.props.eventName}
            onChange={e => this.props.handleChange('eventName', e.target.value)}
          />
          {/*<TextField*/}
          {/*  id="input-username"*/}
          {/*  label="Outlined"*/}
          {/*  type="text"*/}
          {/*  label="Username"*/}
          {/*  value={this.props.userName}*/}
          {/*  onChange={e => this.props.handleChange('userName', e.target.value)}*/}
          {/*/>*/}
          <TextField
            id="input-type"
            label="Outlined"
            type="select"
            label="Type"
            value={this.props.type}
            onChange={e => this.props.handleChange('type', e.target.value)}
          />
          <TextField
            id="input-duration"
            label="Outlined"
            type="text"
            label="Notes"
            value={this.props.notes}
            multiline={true}
            rows={10}
            onChange={e => this.props.handleChange('notes', e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={e =>
                  this.props.handleChange('isOnGoing', e.target.checked)
                }
                name="isOnGoing"
                color="primary"
              />
            }
            label="Is On Going?"
            style={{ width: '50%', color: 'grey' }}
          />
          <DateTimePicker
            onChange={e => this.props.handleChange('startTime', e)}
            value={this.props.startTime}
            className="dateTimeWrapper"
          />
          <DateTimePicker
            onChange={e => this.props.handleChange('endTime', e)}
            value={this.props.endTime}
            className="dateTimeWrapper"
          />

          {this.renderButton()}
        </FormControl>
      </div>
    );
  }
}
