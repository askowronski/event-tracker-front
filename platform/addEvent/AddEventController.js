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
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeDuration = this.changeDuration.bind(this);
        this.changeNotes = this.changeNotes.bind(this);
        this.changeType = this.changeType.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
        this.setMultiPeriod = this.setMultiPeriod.bind(this);
    }

    setMultiPeriod = (value) => {
        this.setState({ multiPeriod: value });
    };

    setIsOnGoing = value => {
        this.setState({ isOnGoing: value });
    };

    handleChangeTitle = (text) => {
        this.setState({ eventName: text });
    };

    handleChangeUser = (text) => {
        this.setState({ userName: text });
    };

    changeDate = (date) => {
        var dateString = date.dateString;
        var year = dateString.split('-')[0];
        var month = dateString.split('-')[1];
        var day = dateString.split('-')[2];

        var newDateString = month + '-' + day + '-' + year;

        this.setState({
            selected: dateString,
            selectedFormatted: newDateString
        });
    };

    changeEndDate = (date) => {
        var dateString = date.dateString;
        var year = dateString.split('-')[0];
        var month = dateString.split('-')[1];
        var day = dateString.split('-')[2];

        var newDateString = month + '-' + day + '-' + year;

        this.setState({
            selectedEndTime: dateString,
            selectedEndTimeFormatted: newDateString
        });
    };

    changeDuration = (duration) => {
        this.setState({ duration: duration });
    };

    changeNotes = (notes) => {
        this.setState({ notes: notes });
    };

    changeType = (type) => {
        this.setState({ type: type });
    };


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
        console.log("clearin dem inputs.");
    };

    changeStartTime = (hours, minutes) => {
        this.setState({
            startTime: {
                selectedHours: hours,
                selectedMinutes: minutes
            }
        });
    };

    changeEndTime = (hours, minutes) => {
        this.setState({
            endTime: {
                selectedHours: hours,
                selectedMinutes: minutes
            }
        });
    };

    handleChange = (stateName, value) => {
      this.setState({
          ...this.state, [stateName]:value
      })
    };
    render() {
        return (
           <AddEvent changeStartTime={this.changeStartTime} changeEndTime={this.changeEndTime}
           changeStartDate={this.changeDate} changeEndDate={this.changeEndDate}
           clearInputs={this.clearInputs}
           createEvent={this.createEvent}
           changeType={this.changeType}
           changeNotes={this.changeNotes}
           changeDuration={this.changeDuration}
           changeUsername={this.handleChangeUser}
           changeIsOnGoing={this.setIsOnGoing}
           changeMultiPeriod={this.setMultiPeriod}
           changeTitle={this.handleChangeTitle}
           handleChange={this.handleChange}
           startTime={this.state.startTime}
           endTime={this.state.endTime}
           clearInputs={this.clearInputs}/>
        )
    }
}