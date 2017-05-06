import React, { Component } from 'react';
import PeriodGoals from './periodGoals';

import './plays.css';

class Plays extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            scoringPlays: []
        };
    }

    componentDidMount = () => {

    }


    render() {

        let output = (<div></div>);
        
        let period1 = [];
        let period2 = [];
        let period3 = [];
        let periodOt = [];
        //const game = this.props.fullGame;

        if (this.props.fullGame != null) {
            
            const game = this.props.fullGame;
            const scoringPlays = this.props.fullGame.liveData.plays.scoringPlays.map(function(sp) {            
                return game.liveData.plays.allPlays[sp];
            });
            console.log(scoringPlays);



            for (let i = 0; i < scoringPlays.length; i++) {
                if (scoringPlays[i].about.period === 1)
                    period1.push(scoringPlays[i]);

                if (scoringPlays[i].about.period === 2)
                    period2.push(scoringPlays[i]);

                if (scoringPlays[i].about.period === 3)
                    period3.push(scoringPlays[i]);

                if (scoringPlays[i].about.period > 3)
                    periodOt.push(scoringPlays[i]);
            }            
        } 
        
        return(
            <div>
                <h3>Scoring Summary</h3>
                <PeriodGoals period="1st Period" goals={period1} />
                <PeriodGoals period="2nd Period" goals={period2} />
                <PeriodGoals period="3rd Period" goals={period3} />
                <PeriodGoals period="Overtime" goals={periodOt} />
                
            </div>
        );
    }
}

export default Plays;