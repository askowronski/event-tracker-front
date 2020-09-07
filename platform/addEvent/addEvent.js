import moment from 'moment';
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import './addEvent.css';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateTimePicker from 'react-datetime-picker';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {FieldsInputContainerComponent} from "../fieldsInput/fieldsInputContainerComponent";

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
    this.state = {
      isOpen: false
    }
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

  renderFields() {
    return this.props.fields.map((field, i) => {
      return (
            <FieldsInputContainerComponent
            field={field}
            handleChangeFields={this.props.handleChangeFields}
            removeField={this.props.removeField}
            />
      )
    })
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

          <IconButton onClick={() => this.props.addField()}>
            <AddIcon />
            Add Fields
          </IconButton>

          <TextField
              id="input-type"
              label="Outlined"
              type="text"
              label="New Field Name"
              value={this.props.newFieldName}
              onChange={e => this.props.handleChange("newFieldName", e.target.value)}
          />
          <Select
              labelId="new-field-type"
              id="eventTypesSelect"
              open={this.state.isOpen}
              onClose={() => {this.setState({
                isOpen: false
              })}}
              onOpen={() => {this.setState({
                isOpen: true
              })}}
              value={this.props.newFieldType}
              onChange={(e) => this.props.handleChange('newFieldType', e.target.value)}
          >
            <MenuItem value="text" selected>
              Text
            </MenuItem>
            <MenuItem value="number" >Number</MenuItem>
            <MenuItem value="json" >Json</MenuItem>
          </Select>

          {this.renderFields()}

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
          <Typography id="discrete-slider" gutterBottom>
            Feel
          </Typography>
          <Slider
            defaultValue={0}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            onChange={(event, value) => this.props.handleChange('feel', value)}
            step={0.1}
            marks
            min={-1}
            max={1}
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
