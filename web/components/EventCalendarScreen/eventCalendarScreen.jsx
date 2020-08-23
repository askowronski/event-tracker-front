import React  from 'react';
import { connect } from "react-redux";
import "./mainComponent.css"
import {EventCalendarContainerConatiner} from "../../../platform/eventCalendar/eventCalendarContainerComponent";
import "react-big-calendar/lib/css/react-big-calendar.css"
import TemporaryDrawer from "../HeaderDrawer/HeaderDrawer";

class EventCalendarScreen extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <section className="main-section">
                <EventCalendarContainerConatiner/>
            </section>
        )
    }
}

const mapStateToProps = function(state){
    return {
        count: state.hitButtonReducer.count
}};

export default connect(mapStateToProps,{})(EventCalendarScreen);