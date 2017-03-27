import React, { Component } from 'react';
import logo from './logo.svg';
import Scoreboard from './scoreboard';
import GameService from './GameService';

import './App.css';
// import TeamsJson from './teams.json';

var request = require('request');
var moment = require('moment');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { myGames: [], myTeams: []};
    
  }

  componentDidMount = () => {
    this.getData();
  }

  getData() {
    const gameDate = moment().format('YYYY-M-D');
    const teamsUrl = 'https://statsapi.web.nhl.com/api/v1/teams/';

    request(teamsUrl,  (error, response, body) => {      
      
      if (error != undefined) {
        console.log(error.message);
      } else {
        const teams = JSON.parse(body).teams;
        
        this.setState( { myTeams: teams.teams } );
        
        const scoresUrl = 'https://statsapi.web.nhl.com/api/v1/schedule?startDate=' + gameDate + '&endDate=' + gameDate + '&expand=schedule.linescore';

        request(scoresUrl,  (error, response, body) => {      
          
          const games = JSON.parse(body).dates[0].games;
          
          const supplementedGames = games.map(function (g){
            
            const away = teams.find(x => x.id === g.teams['away'].team.id);
            const home = teams.find(x => x.id === g.teams['home'].team.id);
            g.awayDetails = away;
            g.homeDetails = home;
            return g;
          } );
          console.log(supplementedGames);
          this.setState({myGames: supplementedGames});
        });  
      }

      
    });

    
  }
  

  render() {
    
    const listItems = this.state.myGames.map((thisGame) => 
      <Scoreboard game={thisGame} key={thisGame.gamePk} />
    );

    return (
      <div className="App">
        <div className="App-header">          
          <h2>{moment().format('MMMM Do')}</h2>
        </div>
      {listItems}  
        
      </div>
    );
  }
}

export default App;
