import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import React  from 'react';

const localizer = momentLocalizer(moment);

const myEventsList= [];


export class EventCalendar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            events: [],
            eventTypes: [],
        }
    }

    fetchEvents() {
        fetch('http://192.168.1.18:8080/events/calendarData')
        .then(res => res.json())
        .then(
            result => {
                this.setState({
                    isLoaded: true,
                    events: result,
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

    render() {
        return(
            <div style={{width: '100%', height: '100%'}}>
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 800, width:'100%' }}
                />
            </div>
        )
    }
}