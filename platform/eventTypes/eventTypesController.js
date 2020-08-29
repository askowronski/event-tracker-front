import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export class EventTypesController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTypes: [],
      isLoaded: false,
      isOpen: false,
      eventType: 'all'
    };
  }

  componentDidMount() {
    this.fetchEventTypes();
  }

  fetchEventTypes = () => {
    fetch('http://localhost:8083/eventTypes')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            eventTypes: result
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
  };

  // handleChange = (stateName, value) => {
  //     this.setState({
  //         ...this.state,
  //         [stateName]: value
  //     });
  // };

  handleOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  handleChange = e => {
    this.setState({
      eventType: e.target.value
    });
  };

  render() {
    return (
      <Select
        labelId="event-types-label"
        id="eventTypesSelect"
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        value={this.props.eventTypeFilter}
        onChange={this.props.handleChange}
      >
        <MenuItem value="all" selected>
          All
        </MenuItem>

        {this.state.eventTypes.map(eventType => (
          <MenuItem value={eventType}>{eventType}</MenuItem>
        ))}
      </Select>
    );
  }
}
