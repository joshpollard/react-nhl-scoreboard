import React, { Component } from 'react';
import './periodGoals.css'; 

class PeriodGoals extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        if (this.props.goals.length === 0) {
            if (this.props.period !== "Overtime") {
                return this.renderNoGoals();
            } else {
                return(<div></div>);
            }
            
        } else {
            return this.renderHasGoals();
        }
    }


    renderHasGoals() {
        return (
            <div>
                <h4 className="period">{this.props.period}</h4>
                <ul className="goal-list"> {this.props.goals.map(this.renderGoal)} </ul>
            </div>
        );
    }

    renderNoGoals() {
        return (
            <div>
                <h4 className="period">{this.props.period}</h4>
                <div className="no-goals">No goals this period</div>
            </div>
        );
    }

    renderGoal(goal) {
        let assists = '';
        let strength = '';

        for (let i = 0; i < goal.players.length; i++) {
            if (goal.players[i].playerType === 'Assist') {
                if (assists === '') {
                    assists = ' from ' + goal.players[i].player.fullName;
                } else {
                    assists += ' and ' + goal.players[i].player.fullName;
                }

            }
        }

        if (goal.result.strength.code !== 'EVEN') {
            strength = ' (' + goal.result.strength.name + ')';
        }

        return(<li key={goal.about.eventIdx}>{goal.about.periodTime} {goal.team.triCode} {goal.players[0].player.fullName} {assists} {strength}</li>)
    }

}

export default PeriodGoals;