import React, { Component } from 'react';
import Plays from './plays';
import './gameDetail.css';


class GameDetail extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            fullGame: {}
        };
    }

    componentDidMount = () => {
        
    }

    componentDidUpdate () {
        
    }



    calculateTotal(scores) {
        let total = 0;
        scores.map((score) => {
            
            if (!isNaN(parseInt(score))) {
                total += parseInt(score);
            }
        });

        return total;
    }

    closeDisplay() {
        debugger;
    }


    render() {
        
        // this.getGame();
        let game = this.props.game;    
        let awayPeriodScores = [];
        let homePeriodScores = [];
        
        for (let i = 0; i< game.linescore.periods.length; i++ ) {
            awayPeriodScores.push(game.linescore.periods[i].away.goals);
            homePeriodScores.push(game.linescore.periods[i].home.goals);
        }

        for (let i = awayPeriodScores.length; i < 4; i++) {
            awayPeriodScores.push('');
            homePeriodScores.push('');
        }



        return (
            <div id="game-detail">
                <div className="row">
                    <div className="col-md-11">
                        <h2>{game.awayDetails.teamName} @ {game.homeDetails.teamName}</h2>
                    </div>
                    <div className="col-md-1">
                        <div className="close-button"><a href="#" onClick={this.props.closeGame}>X</a></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-condensed">
                            <thead>
                                <tr>
                                    <td></td><td>1st</td><td>2nd</td><td>3rd</td><td>OT</td><td>Final</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{game.awayDetails.teamName}</td>
                                    <td>{awayPeriodScores[0]}</td>
                                    <td>{awayPeriodScores[1]}</td>
                                    <td>{awayPeriodScores[2]}</td>
                                    <td>{awayPeriodScores[3]}</td>
                                    <td>{this.calculateTotal(awayPeriodScores)}</td>
                                </tr>
                                <tr>
                                    <td>{game.homeDetails.teamName}</td>
                                    <td>{homePeriodScores[0]}</td>
                                    <td>{homePeriodScores[1]}</td>
                                    <td>{homePeriodScores[2]}</td>
                                    <td>{homePeriodScores[3]}</td>
                                    <td>{this.calculateTotal(homePeriodScores)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Plays fullGame={this.props.fullGame} />
                    </div>
                </div>
                
            </div>
        );
    }
}

export default GameDetail;