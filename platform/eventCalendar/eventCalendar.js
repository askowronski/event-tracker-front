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
}

export class EventCalendar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            events: [],
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
                this.setState({
                    isLoaded: true,
                    events: result,
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

    ColoredDateCellWrapper = ({ children, event }) => {
        let backgroundColor = 'lightblue';
        let type = event.title;

        let newColor = eventColorLegend[type];

        console.log(newColor);
        return React.cloneElement(React.Children.only(children), {
            style: {
                backgroundColor: newColor,
            },
        })
    }

    render() {
        return(
            <div style={{width: '100%', height: '100%'}}>
                <Calendar
                    localizer={localizer}
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 800, width:'100%' }}
                    components={{
                        eventWrapper: this.ColoredDateCellWrapper,
                    }}
                />
            </div>
        )
    }
}