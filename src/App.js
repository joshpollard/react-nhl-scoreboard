import React, { Component } from 'react';
import logo from './logo.svg';
import Scoreboard from './scoreboard';
import './App.css';
var request = require('request');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { myGame: {}, myGames: []};
  }

  componentWillMount() {
    
    // request('https://statsapi.web.nhl.com/api/v1/schedule?startDate=2017-3-13&endDate=2017-3-13', function (error, response, body) {      
    //   var games = JSON.parse(body);
    //   var game = games.dates[0].games[0];
    //   //this.setState({myGame: game});
    //   that.setState({comment: 'Hello'});
    // });

    var xhr = new XMLHttpRequest();

      // Make a call to the server using the url property we defined down below.
      // Use the JSON result as the data property for this ThingBox.
      xhr.open('get', 'https://statsapi.web.nhl.com/api/v1/schedule?startDate=2017-3-13&endDate=2017-3-13', true);
      xhr.onload = function()  {
          var games = JSON.parse(xhr.responseText);
          var game = games.dates[0].games[0];
          this.setState( { myGame: game } );
          this.setState({myGames: games.dates[0].games});
          //debugger;
      }.bind(this);
      xhr.send();    
  }
  
  render() {
    
    const listItems = this.state.myGames.map((thisGame) => 
      <Scoreboard game={thisGame} key={thisGame.gamePk} />
    );

    return (
      <div className="App">
        <div className="App-header">          
          <h2>Welcome to React</h2>
        </div>
        {/*<Scoreboard game={this.state.myGame} />*/}
      {listItems}  
        
      </div>
    );
  }
}

export default App;
