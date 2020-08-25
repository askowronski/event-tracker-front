import React from 'react';
import "./addEvent.css"
import {AddEvent} from "./addEvent";



const myEventsList = [];

const eventColorLegend = {
    'injury': 'red',
    'run': 'green',
    'rock-ring': 'blue',
    'handstand': 'yellow',
    'Test': 'orange',
    'test': 'orange',
    'yoga': 'lightblue'
};

export class AddEventController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            userName: '',
            selected: '',
            selectedEndTime: '',
            selectedFormatted: '',
            selectedEndTimeFormatted: '',
            isOnGoing: false,
            duration: '',
            notes: '',
            type: '',
            multiPeriod: false,
            startTime: new Date(),
            endTime: new Date(),
        };
    }



    createEvent = (clearInputsRef) => {

        let body = {
            name: this.state.eventName,
            type: this.state.type,
            startTime: this.state.startTime,
            duration: this.state.duration,
            notes: this.state.notes
        };

        if (this.state.multiPeriod && !this.state.isOnGoing) {
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
            console.log('ok');
        })
        .catch(function(error) {
            console.log(error);
        });
    };

    clearInputs = () => {
        this.setState( {
            eventName: '',
            userName: '',
            selected: '',
            selectedEndTime: '',
            selectedFormatted: '',
            selectedEndTimeFormatted: '',
            isOnGoing: false,
            duration: '',
            notes: '',
            type: '',
            multiPeriod: false,
            startTime: new Date(),
            endTime: new Date(),
        });
    };

    handleChange = (stateName, value) => {
      this.setState({
          ...this.state, [stateName]:value
      })
    };
    render() {
        return (
           <AddEvent
           changeTitle={this.handleChangeTitle}
           handleChange={this.handleChange}
           startTime={this.state.startTime}
           endTime={this.state.endTime}
           clearInputs={this.clearInputs}/>
        )
    }
}