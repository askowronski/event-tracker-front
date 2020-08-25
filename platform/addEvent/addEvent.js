import moment from 'moment'
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import "./addEvent.css"
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DateTimePicker from "react-datetime-picker";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";


const myEventsList = [];

const eventColorLegend = {
    'injury': 'red',
    'run': 'green',
    'rock-ring': 'blue',
    'handstand': 'yellow',
    'Test': 'orange',
    'test': 'orange',
    'yoga': 'lightblue'
}

export class AddEvent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{width: '100%', height: '100%'}}>
                <FormControl halfWidth>
                    <TextField id="input-title" label="Outlined" type="text"
                               label="Title"
                               onChange={(e) => this.props.handleChange("eventName", e.target.value)}             />
                    <TextField id="input-username" label="Outlined" type="text"
                               label="Username"
                               onChange={(e) => this.props.handleChange("userName", e.target.value)}          />
                    <TextField id="input-type" label="Outlined" type="select"
                               label="Type"
                               onChange={(e) => this.props.handleChange("type", e.target.value)}  />
                    <TextField id="input-duration" label="Outlined"
                               type="number" label="Duration (s)"
                               onChange={(e) => this.props.handleChange("duration", e.target.value)}  />
                    <TextField id="input-duration" label="Outlined"
                               type="text" label="Notes"
                               multiline={true}
                               rows={10}
                               onChange={(e) => this.props.handleChange("notes", e.target.value)}  />
                               <div className="checkboxContainer">
                                   <FormControlLabel
                                       control={
                                           <Checkbox
                                               onChange={(e) => this.props.handleChange("multiPeriod", e.target.checked)}
                                               name="multiPeriod"
                                               color="primary"
                                           />
                                       }
                                       label="MultiDay?"
                                   />
                                   <FormControlLabel
                                       control={
                                           <Checkbox
                                               onChange={(e) => this.props.handleChange("isOnGoing", e.target.checked)}
                                               name="isOnGoing"
                                               color="primary"
                                           />
                                       }
                                       label="Is On Going?"
                                       style={{width: '50%'}}
                                   />
                               </div>
                    <DateTimePicker
                        onChange={(e) => this.props.handleChange("startTime", e)}
                        value={this.props.startTime}
                        className="dateTimeWrapper"
                    />
                    <DateTimePicker
                        onChange={(e) => this.props.handleChange("endTime", e)}
                        value={this.props.endTime}
                        className="dateTimeWrapper"
                    />

                    <Button onClick={ () => this.props.createEvent(this.props.clearInputs)}>Create Event</Button>

                </FormControl>

            </div>
        )
    }
}