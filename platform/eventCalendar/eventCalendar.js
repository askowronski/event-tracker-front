import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import { EventTypesController } from '../eventTypes/eventTypesController';

const localizer = momentLocalizer(moment);

const myEventsList = [];

const eventColorLegend = {
  injury: '#b32400',
  run: 'green',
  'rock-ring': 'brown',
  handstand: 'yellow',
  Test: 'orange',
  test: 'orange',
  yoga: '#33ccff',
  stretch: 'lightgreen',
  'physical-therapy': 'lightpink',
  'pt-exercises': '#336600'

};

export class EventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      events: [],
      eventsConverted: [],
      eventsConvertedCopy: [],
      eventTypes: [],
      eventTypeFilter: 'all'
    };
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
            eventsConverted: result,
            eventsConvertedCopy: result
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

  convertEventsToJavascriptDates(events) {
    events.forEach(event => {
      event.start = new Date(event.start);
      event.end = new Date(event.end);
    });
  }

  handleChangeFilter = e => {
    this.setState({
      eventTypeFilter: e.target.value
    });
    this.filterEvents(e.target.value);
  };

  filterEvents(filter) {
    if (filter === 'all') {
      this.setState({
        eventsConverted: [...this.state.eventsConvertedCopy]
      });
    } else {
      let filteredArray = [];

      this.state.eventsConvertedCopy.map(e => {
        if (e.title === filter) {
          filteredArray.push(e);
        }
      });

      this.setState({
        eventsConverted: filteredArray
      });
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div>
          <EventTypesController
            eventTypeFilter={this.state.eventTypeFilter}
            handleChange={this.handleChangeFilter}
          />
        </div>
        <Calendar
          localizer={localizer}
          events={this.state.eventsConverted}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800, width: '100%' }}
          eventPropGetter={event => ({
            style: {
              backgroundColor: eventColorLegend[event.title]
            }
          })}
        />
      </div>
    );
  }
}
