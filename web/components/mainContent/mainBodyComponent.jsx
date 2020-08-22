import React  from 'react';
import { connect } from "react-redux";
import { ThanosCaptionConatiner } from '../../../platform/thanosCaption/thanosCaptionConatinerComponent';
import HitButtonContainer from "../../../platform/thanosHitButton/hitButtonContainerComponent";
import "./mainComponent.css"
import {EventCalendarContainerConatiner} from "../../../platform/eventCalendar/eventCalendarContainerComponent";
import "react-big-calendar/lib/css/react-big-calendar.css"

class MainComponent extends React.Component {
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

export default connect(mapStateToProps,{})(MainComponent);