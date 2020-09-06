import React from 'react';
import { AddEvent } from './addEvent';
import {FieldsInputContainerComponent} from "../fieldsInput/fieldsInputContainerComponent";

const myEventsList = [];

const eventColorLegend = {
  injury: 'darkred',
  run: 'green',
  'rock-ring': 'blue',
  handstand: 'yellow',
  Test: 'orange',
  test: 'orange',
  yoga: 'lightblue'
};

export class AddEventController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      userName: '',
      isOnGoing: false,
      duration: '',
      notes: '',
      type: '',
      startTime: new Date(),
      endTime: new Date(),
      isEdit: false,
      editId: '',
      feel: 0.2,
      feelRN: 0,
      newFieldName: '',
      newFieldType: 'text',
      fields: [],
    };
  }

  componentDidMount() {
    const { isEdit } = this.props;
    if (isEdit) {
      const { notes, type, startTime, endTime } = this.props.editEvent;
      const {eventType} = this.props.editEvent;
      const {fields} = eventType;
      const { isEdit, editId, eventName, userName, isOnGoing } = this.props;
      this.setState({
        eventName,
        userName,
        notes,
        type,
        startTime,
        endTime,
        isEdit,
        editId,
        isOnGoing,
        fields
      });
    }
  }

  createEvent = clearInputsRef => {
    let body = {
      name: this.state.eventName,
      type: this.state.type,
      startTime: this.state.startTime,
      duration: this.state.duration,
      notes: this.state.notes,
      id: this.state.id,
      feel: this.state.feel,
      eventType: {
        type: this.state.type,
        fields: this.state.fields
      }
    };

    if (!this.state.isOnGoing) {
      body.endTime = this.state.endTime;
    }

    // to do, add this to an env variable so we can parametrize
    fetch('http://192.168.1.18:8083/event', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(function(response) {
        if (!response.ok) {
          // failToast.show('Add Event Failed');
          throw Error(response.statusText);
        }
        return response;
      })
      .then(function(response) {
        // successToast.show('Event Added.');
        clearInputsRef();
        alert('Event Added');
      })
      .catch(function(error) {
        alert(error);
        console.log(error);
      });
  };

  editEvent = closeModalRef => {
    let body = {
      name: this.state.eventName,
      type: this.state.type,
      startTime: this.state.startTime,
      duration: this.state.duration,
      notes: this.state.notes,
      id: this.state.editId,
      feel: this.state.feel,
      eventType: {
        type: this.state.type,
        fields: this.state.fields
      }
    };

    if (!this.state.isOnGoing) {
      body.endTime = this.state.endTime;
    }

    // to do, add this to an env variable so we can parametrize
    fetch('http://192.168.1.18:8083/event/', {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(function(response) {
        if (!response.ok) {
          // failToast.show('Add Event Failed');
          throw Error(response.statusText);
        }
        return response;
      })
      .then(function(response) {
        // successToast.show('Event Added.');
        closeModalRef();
        console.log('ok');
        alert('ok');
      })
      .catch(function(error) {
        alert(error);
        console.log(error);
      });
  };

  clearInputs = () => {
    this.setState({
      eventName: '',
      userName: '',
      isOnGoing: false,
      duration: '',
      notes: '',
      type: '',
      startTime: new Date(),
      endTime: new Date(),
      feel: 0.0,
      feelRN: 0.0,
      fields: [],
      newFieldName: '',
      newFieldType: 'text',
    });
  };

  handleChange = (stateName, value) => {
    this.setState({
      ...this.state,
      [stateName]: value
    });
  };

  handleChangeFields = (fieldName, fieldValue, fieldType) => {

    let fields = this.state.fields.slice();
    let existingField = false;
    for (let i = 0; i < fields.length; i++) {
      if(fields[i].name === fieldName) {
        fields[i].value = fieldValue;
        existingField = true;
        break;
      }
    }
    if (!existingField) {
      let newField = {
        name: fieldName,
        value: fieldValue,
        type: fieldType
      };
      fields.push(newField);
    }

    this.setState({
      fields: fields
    })
  };

  addField = () => {
    if (this.state.newFieldName === '' || this.state.newFieldName.includes(
        " ") || this.fieldsContainFieldAlready(this.state.newFieldName)) {
      alert('Fix your new field name');
      return;
    }
    this.handleChangeFields(this.state.newFieldName, "", this.state.newFieldType);
  };

  fieldsContainFieldAlready = (fieldName) => {
    let fields = this.state.fields.slice();
    for (let i = 0; i < fields.length; i++) {
      if(fields[i].name === fieldName) {
        return true;
      }
    }
    return false;
  };

  removeField = (fieldName) => {
    console.log("remvoe filed " + fieldName)
    let fieldsCopy = this.state.fields.slice();
    let filteredArray = fieldsCopy.filter(function(field) {
      return field.name !== fieldName;
    });
    this.setState({
      fields: filteredArray
    })
  };

  render() {
    return (
      <AddEvent
        handleChange={this.handleChange}
        startTime={this.state.startTime}
        endTime={this.state.endTime}
        clearInputs={this.clearInputs}
        createEvent={this.createEvent}
        editEvent={this.editEvent}
        closeModal={this.props.closeModal}
        isOnGoing={this.state.isOnGoing}
        eventName={this.state.eventName}
        type={this.state.type}
        userName={this.state.userName}
        notes={this.state.notes}
        isEdit={this.state.isEdit}
        feel={this.state.feel}
        feelRN={this.state.feelRN}
        fields={this.state.fields}
        handleChangeFields={this.handleChangeFields}
        newFieldName={this.state.newFieldName}
        newFieldType={this.state.newFieldType}
        addField={this.addField}
        removeField={this.removeField}
      />
    );
  }
}
