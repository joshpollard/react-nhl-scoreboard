import React, { Component } from 'react';
var moment = require('moment');

class Scoreboard extends Component {
    
    getTeamColor(team) {
        
        let value = 'black';

        if (team != null) {

            switch(team)
            {
                case "ANA":
                    value = "#9d7746";
                    break;

                case "BOS":
                    value = "#ffc422";
                    break;

                case "BUF":
                    value = "#062045";
                    break;

                case "CAL":
                    value = "#d22402";
                    break;

                case "CAR":
                    value = "#e00809";
                    break;

                case "CHI":
                    value = "#ff0000";
                    break;

                case "COL":
                    value = "#74182d";
                    break;

                case "CBJ":
                    value = "#03296a";
                    break;

                case "DAL":
                    value = "#0c724c";
                    break;

                case "DET":
                    value = "#ff0000";
                    break;

                case "EDM":
                    value = "#042664";
                    break;

                case "FLA":
                    value = "#cc0a2c";
                    break;

                case "LAK":
                    value = "#a8a9ad";
                    break;

                case "MIN":
                    value = "#064635";
                    break;

                case "MTL":
                    value = "#FF0000";
                    break;

                case "NSH":
                    value = "#fcbe34";
                    break;

                case "NJD":
                    value = "#c40e2c";
                    break;

                case "NYI":
                    value = "#00529c";
                    break;

                case "NYR":
                    value = "#005ebc";
                    break;

                case "OTT":
                    value = "#FF0000";
                    break;

                case "PHI":
                    value = "#f47a3c";
                    break;

                case "PHX":
                    value = "#842234";
                    break;

                case "PIT":
                    value = "#ccb87b";
                    break;

                case "SJS":
                    value = "#007889";
                    break;

                case "STL":
                    value = "#00529b";
                    break;

                case "TBL":
                    value = "#1c427c";
                    break;

                case "TOR":
                    value = "#013775";
                    break;

                case "VAN":
                    value = "#173059";
                    break;

                case "WAS":
                    value = "#FF0000";
                    break;

                case "WPG":
                    value = "#042e64";
                    break;

                default:
                    value = "#FF0000";
                    break;
            }

        }
        

        return  {
            borderLeftColor: value
        };
    }

    processTimeDisplay() {
        let result = '';
        if (this.props.game != null) {
            const ls = this.props.game.linescore;
            if (ls.currentPeriodTimeRemaining === 'Final') {
                result = 'Final';

                if (ls.currentPeriodOrdinal === 'SO') {
                    result += ' - SO';
                }
                
            } else {
                if (ls.currentPeriod >= 1) {
                    result = ls.currentPeriodOrdinal + ' ' + ls.currentPeriodTimeRemaining;

                    if (ls.currentPeriodOrdinal === 'SO') {
                        result = 'SO';
                    }
                } else {
                    if (ls.currentPeriod === 0) {
                        result = moment(this.props.game.gameDate).format('h:mm a');
                    }
                }
                
            }
            
        }

        return result;
    }

    render() {
        
        let awayScore = '';
        let game = { awayScore: '', homeScore: '', awayTeamName: '', homeTeamName: ''};
        let homeTeam = {};
        let awayTeam = {};
        let homeDetails = {};
        let awayDetails = {};

        if (this.props.game.teams != null) {
            homeTeam = this.props.game.teams['home'];
            awayTeam = this.props.game.teams['away'];
            homeDetails = this.props.game.homeDetails;
            awayDetails = this.props.game.awayDetails;
            game.awayScore = this.props.game.teams['away'].score;
            game.awayTeamName = this.props.game.teams['away'].team.name;
            game.homeScore = this.props.game.teams['home'].score;
            game.homeTeamName = this.props.game.teams['home'].team.name;
        } 

        

        return (
            <div className="scoreboard-container">
                
                <div className='time-display text-right'>{this.processTimeDisplay()}</div>

                <div className="team-row" style={this.getTeamColor(awayDetails.abbreviation)}>
                    <div className="team-name">
                        {game.awayTeamName}
                    </div>
                    
                    <div className="score text-right">
                        {game.awayScore}
                    </div>
                </div>
                
                <div className="team-row" style={this.getTeamColor(homeDetails.abbreviation)}>
                    <div className='team-name'>
                        {game.homeTeamName}
                    </div>
                    <div className='score text-right'>
                        {game.homeScore}
                    </div>
                </div>
            </div>
        )
    }
}

export default Scoreboard;