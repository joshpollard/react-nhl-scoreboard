import React, { Component } from 'react';
import Scoreboard from './scoreboard';
import DayChooser from './daychooser';
import GameService from './GameService';
import Loader from './loader.js';
import GameDetail from './gameDetail';
import NoGames from './noGames';
import rp from 'request-promise';
import './App.css';

var moment = require('moment');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      myGames: [], 
      myTeams: [], 
      currentDate: moment(),
      currentGame: null,
      fullGame: null,
      isLoading: true
    };
    
    // This binding is necessary to make `this` work in the callback
    this.changeDate = this.changeDate.bind(this);
    this.selectGame = this.selectGame.bind(this);
    this.closeGame = this.closeGame.bind(this);
  }

  componentDidMount = () => {
    //const gameDate = moment().format('YYYY-M-D');
    
    // setTimeout(() => this.getData(gameDate), 1200);


    var reload = () => {
      this.getData(moment(this.state.currentDate).format('YYYY-M-D'));
    };

    reload();

    // setInterval(reload , 30000);
  }

  changeDate(increment) {
    
    const gameDate = moment(this.state.currentDate).add(increment, 'days');
    this.setState({currentDate: gameDate});
    this.getData(moment(gameDate).format('YYYY-M-D'));
  }

  selectGame(game) {
    this.getGame(game.link);
    this.setState({currentGame: game});
  }

  closeGame() {
    
    this.setState({currentGame: null});
  }

  getGame(gameLink) {    

    const url = 'https://statsapi.web.nhl.com' + gameLink;

    rp(url).then((gameData) => {
        
        const data = JSON.parse(gameData);

        this.setState({fullGame: data});

    });
  }

  getData(gameDate) {
  
    // this.setState({isLoading: true});
    const gameService = new GameService();
    var teamDataPromise = gameService.getTeams();

    teamDataPromise.then((d) => {
      const teams = JSON.parse(d).teams;
        
      this.setState( { myTeams: teams.teams } );

      gameService.getGamesForDate(gameDate)
        .then((gameData) => {

          const data = JSON.parse(gameData);

          if (data.dates.length > 0) {
            const games = data.dates[0].games;
            
            const supplementedGames = games.map(function (g){
              const away = teams.find(x => x.id === g.teams['away'].team.id);
              const home = teams.find(x => x.id === g.teams['home'].team.id);
              g.awayDetails = away;
              g.homeDetails = home;
              return g;
            });

            this.setState({myGames: supplementedGames});            
          } else {
            this.setState({myGames: []});
          }

          this.setState({isLoading: false});
          
        });

    });    
  }
  

  render() {
    
    const listItems = this.state.myGames.map((thisGame) => 
      <Scoreboard game={thisGame} key={thisGame.gamePk} selectGame={this.selectGame} />
    );

    var mainItem = listItems;
    var gameDetail = (<div></div>);

    if (this.state.isLoading) {
      mainItem = (<Loader />)    
    }
    if (this.state.myGames.length === 0) {
      mainItem = (<NoGames />);
    }

    if (this.state.currentGame != null) {
      gameDetail = (<GameDetail game={this.state.currentGame} fullGame={this.state.fullGame} closeGame={this.closeGame} />);
    }

    return (
      <div className="App">
        
        <div className="row">
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12">

                <div className="App-header">
                  <DayChooser currentDate={this.state.currentDate} changeCurrentDate={this.changeDate} />
                </div>
                <div id="game-list">
                  {mainItem}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {gameDetail}
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
