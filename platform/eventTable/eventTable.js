import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import './eventTable.css';
import Modal from '@material-ui/core/Modal';
import { AddEventContainerComponent } from '../addEvent/addEventContainerComponent';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import EnhancedTableHead from '../../app/components/Table/EnhancedTableHead';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    align: 'left',
    disablePadding: true,
    label: 'Event Name'
  },
  {
    id: 'type',
    numeric: false,
    align: 'right',
    disablePadding: false,
    label: 'Type'
  },
  {
    id: 'feel',
    numeric: true,
    align: 'right',
    disablePadding: false,
    label: 'Feel (-1<->1)'
  },
  {
    id: 'startTime',
    numeric: false,
    align: 'right',
    disablePadding: false,
    label: 'Start Time'
  },
  {
    id: 'endTime',
    numeric: false,
    align: 'right',
    disablePadding: false,
    label: 'End Time'
  },
  {
    id: 'notes',
    numeric: false,
    align: 'left',
    disablePadding: false,
    label: 'Notes'
  },
  {
    id: 'actions',
    numeric: false,
    align: 'left',
    disablePadding: false,
    label: 'Actions'
  }
];

export class EventTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      events: [],
      eventsConverted: [],
      eventTypes: [],
      page: 0,
      rowsPerPage: 10,
      modalOpen: false,
      editEvent: {
        eventName: ''
      },
      order: 'asc',
      orderBy: 'startTime'
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = () => {
    fetch('http://localhost:8083/events')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            events: result
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

  deleteEvent = (eventId, fetchEvents) => {
    if (confirm('Do You Really Want To Delete This?')) {
      this.processDelete(eventId, fetchEvents);
    }
  };

  processDelete = (eventId, fetchEvents) => {
    // to do, add this to an env variable so we can parametrize
    fetch('http://192.168.1.18:8083/event/' + eventId, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(function(response) {
        if (!response.ok) {
          // failToast.show('Add Event Failed');
          throw Error(response.statusText);
        }
        return response;
      })
      .then(function(response) {
        console.log('ok');
        alert('Event Deleted.');
        fetchEvents();
      })
      .catch(function(error) {
        alert(error);
        console.log(error);
      });
  };

  closeModal = () => {
    console.log('closing modal');
    this.setState({
      modalOpen: false
    });
    this.fetchEvents();
  };

  openModal(event) {
    this.setState({
      modalOpen: true,
      editEvent: event
    });
  }

  renderActions(event) {
    return (
      <div>
        <Button
          onClick={() => this.openModal(event)}
          style={{ backgroundColor: '#1d697c', color: 'white' }}
        >
          Edit
        </Button>
        <Button
          onClick={() => this.deleteEvent(event.id, this.fetchEvents)}
          style={{ backgroundColor: '#1d697c', color: 'white' }}
        >
          Delete
        </Button>
      </div>
    );
  }

  setPage = page => {
    this.setState({
      page: page
    });
  };

  formatDate = date => {
    return new Date(date).toLocaleString();
  };

  setRowsPerPage = rows => {
    this.setState({
      rowsPerPage: rows
    });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleChangeRowsPerPage = event => {
    this.setRowsPerPage(+event.target.value);
    this.setPage(0);
  };

  renderNotes(notes) {
    return (
      <div className="tableNotesDiv">
        <p>{notes}</p>
      </div>
    );
  }

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';

    this.setState({
      order: isAsc ? 'desc' : 'asc',
      orderBy: property
    });
  };

  render() {
    return (
      <div style={{ width: '100%' }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" className="eventTable">
            <EnhancedTableHead
              order={this.state.order}
              orderBy={this.state.orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.events.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(
                this.state.events,
                getComparator(this.state.order, this.state.orderBy)
              )
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map(event => (
                  <TableRow key={event.id}>
                    <TableCell component="th" scope="row">
                      {event.name}
                    </TableCell>
                    <TableCell align="right">{event.eventType.type}</TableCell>
                    <TableCell align="right">{event.feel}</TableCell>
                    <TableCell align="right">
                      {this.formatDate(event.startTime)}
                    </TableCell>
                    <TableCell align="right">
                      {this.formatDate(event.endTime)}
                    </TableCell>
                    <TableCell>{this.renderNotes(event.notes)}</TableCell>
                    <TableCell>{this.renderActions(event)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.events.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        <Modal
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
          }}
          open={this.state.modalOpen}
          onClose={this.closeModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="editEventModalContainer">
            <AddEventContainerComponent
              isEdit={true}
              eventName={this.state.editEvent.name}
              userName={this.state.editEvent.userName}
              isOnGoing={this.state.editEvent.onGoing}
              editEvent={this.state.editEvent}
              editId={this.state.editEvent.id}
              closeModal={this.closeModal}
              modalOpen={this.state.modalOpen}
            />
            <Button
              onClick={() => this.closeModal()}
              style={{ backgroundColor: '#1d697c', color: 'white' }}
              className="closeModalButton"
            >
              Close Modal
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
