import React, { Component } from 'react';
var moment = require('moment');

class Scoreboard extends Component {
    
    getTeamColor(team) {
        
        let value = 'black';

        var teamColors =
        {
            ANA:'#9d7746',
            BOS:'#ffc422',
            BUF:'#062045',
            CGY:'#d22402',
            CAR:'#e00809',
            CHI:'#ff0000',
            COL:'#74182d',
            CBJ:'#03296a',
            DAL:'#0c724c',
            DET:'#ff0000',
            EDM:'#042664',
            FLA:'#cc0a2c',
            LAK:'#a8a9ad',
            MIN:'#064635',
            MTL:'#FF0000',
            NSH:'#fcbe34',
            NJD:'#c40e2c',
            NYI:'#00529c',
            NYR:'#005ebc',
            OTT:'#FF0000',
            PHI:'#f47a3c',
            PHX:'#842234',
            PIT:'#ccb87b',
            SJS:'#007889',
            STL:'#00529b',
            TBL:'#1c427c',
            TOR:'#013775',
            VAN:'#173059',
            WAS:'#FF0000',
            WPG:'#042e64'
        }

        if (team != null) {
            value = teamColors[team];
        }

        return  { borderLeftColor: value };
    }

    processTimeDisplay() {
        let result = '';
        if (this.props.game != null) {
            const ls = this.props.game.linescore;
            if (ls.currentPeriodTimeRemaining === 'Final') {
                result = 'Final';

                if (ls.currentPeriodOrdinal === 'SO') {
                    result += ' SO';
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