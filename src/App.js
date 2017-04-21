import React, { Component } from 'react';
import logo from './logo.svg';
import Scoreboard from './scoreboard';
import DayChooser from './daychooser';
import GameService from './GameService';

import './App.css';
// import TeamsJson from './teams.json';

var request = require('request');
var moment = require('moment');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { myGames: [], myTeams: [], currentDate: moment()};
    
    // This binding is necessary to make `this` work in the callback
    this.changeDate = this.changeDate.bind(this);
  }

  componentDidMount = () => {
    const gameDate = moment().format('YYYY-M-D');
    
    setTimeout(() => this.getData(gameDate), 1200);
  }

  changeDate(increment) {
    
    const gameDate = moment(this.state.currentDate).add(increment, 'days');
    this.setState({currentDate: gameDate});
    this.getData(moment(gameDate).format('YYYY-M-D'));
  }

  getData(gameDate) {
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
          <DayChooser currentDate={this.state.currentDate} changeCurrentDate={this.changeDate} />
        </div>
      {listItems}  
        
      </div>
    );
  }
}

export default App;
