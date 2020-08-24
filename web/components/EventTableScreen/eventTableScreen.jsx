import React  from 'react';
import { connect } from "react-redux";
import "./mainComponent.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import {EventTableContainerComponent} from "../../../platform/eventTable/eventTableContainerComponent";

export class EventTableScreen extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <section className="main-section">
                <EventTableContainerComponent/>
            </section>
        )
    }
}


