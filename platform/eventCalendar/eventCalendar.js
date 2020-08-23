import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import React  from 'react';

const localizer = momentLocalizer(moment);

const myEventsList= [];

const eventColorLegend = {
    'injury': 'red',
    'run': 'green',
    'rock-ring': 'blue',
    'handstand': 'yellow',
    'Test' : 'orange',
    'test': 'orange',
    'yoga' : 'lightblue'
}

export class EventCalendar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            events: [],
            eventsConverted: [],
            eventTypes: [],
        }
    }

    componentDidMount() {
        this.fetchEvents();
    }

    fetchEvents() {
        fetch('http://localhost:8083/events/calendarData/web')
        .then(res => res.json())
        .then(
            result => {
                this.convertEventsToJavascriptDates(result);
                this.setState({
                    isLoaded: true,
                    eventsConverted: result
                })

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

    convertEventsToJavascriptDates(events) {
        events.forEach(event => {
            event.start = new Date(event.start);
            event.end = new Date(event.end);
        });
    }


    render() {
        return(
            <div style={{width: '100%', height: '100%'}}>
                <Calendar
                    localizer={localizer}
                    events={this.state.eventsConverted}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 800, width:'100%' }}
                    eventPropGetter={event => ({
                        style : {
                            backgroundColor: eventColorLegend[event.title]
                        }
                    })}
                />
            </div>
        )
    }
}