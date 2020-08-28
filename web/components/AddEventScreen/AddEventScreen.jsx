import React  from 'react';
import {AddEventContainerComponent} from "../../../platform/addEvent/addEventContainerComponent";

export class AddEventScreen extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <section className="main-section">
                <AddEventContainerComponent/>
            </section>
        )
    }
}


