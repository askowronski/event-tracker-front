import React  from 'react';
import { connect } from "react-redux";
import "./mainComponent.css"
import {EventCalendarContainerConatiner} from "../../../platform/eventCalendar/eventCalendarContainerComponent";
import "react-big-calendar/lib/css/react-big-calendar.css"

export class EventCalendarScreen extends React.Component {
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


