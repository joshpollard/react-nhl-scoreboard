import React, { Component } from 'react';
import './daychooser.css';

var moment = require('moment');

class DayChooser extends Component {
    constructor(props) {
        super(props);
        
        // This binding is necessary to make `this` work in the callback
        this.viewYesterday = this.viewYesterday.bind(this);
        this.viewTomorrow = this.viewTomorrow.bind(this);
    }

    viewYesterday() {
        this.props.changeCurrentDate(-1);
    }

    viewTomorrow() {
        this.props.changeCurrentDate(1);
    }

    render() {
        
        return (
            <div id="day-chooser">
                <span className="not-today-header"><a href="#" onClick={this.viewYesterday}>{moment(this.props.currentDate).subtract(1, 'days').format('MMMM Do')}</a></span> 
                <span className="today-header">{moment(this.props.currentDate).format('MMMM Do')}</span>
                <span className="not-today-header"><a href="#" onClick={this.viewTomorrow}>{moment(this.props.currentDate).add(1, 'days').format('MMMM Do')}</a></span>
            </div>
        );
    }
}

export default DayChooser;