import React, { Component } from 'react';

class Scoreboard extends Component {
    
    render() {
        let awayScore = '';
        let game = { awayScore: '', homeScore: '', awayTeamName: '', homeTeamName: ''};
        
        if (this.props.game.teams != null) {
            game.awayScore = this.props.game.teams['away'].score;
            game.awayTeamName = this.props.game.teams['away'].team.name;
            game.homeScore = this.props.game.teams['home'].score;
            game.homeTeamName = this.props.game.teams['home'].team.name;
        } 

        return (
            <div className="scoreboard-container">
                <div className="row">
                    <div className="col-md-3">
                        {game.awayTeamName}
                    </div>
                    <div className="col-md-1">
                        {game.awayScore}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        {game.homeTeamName}
                    </div>
                    <div className="col-md-1">
                        {game.homeScore}
                    </div>
                </div>
            </div>
        )
    }
}

export default Scoreboard;