import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  token = null;
  state = {
    GameQuery: "",
    GuessQuery: "",
    GamePostQuery: "",
    GuessPostQuery: "",
    gameId: "",
    guessed: "",
    message: "",
    gameState: "",
    GuessgameId: "",
    Guessguessed: "",
    GuessgameState: "",
    GamePostgameId: "",
    GamePostguessed: "",
    GamePostmessage: "",
    GamePostgameState: "",
    GuessPostguessed: "",
    GuessPostmessage: "",
    GuessPostgameState: "",
  };

  GameGetOnChange = e => {
    const { value } = e.target;
    this.setState({
      GameQuery: value
    });

    this.GameGetSearch(value);
  };

  GameGetSearch = GameQuery => {
    const url = `http://127.0.0.1:5000/games/${GameQuery}`;
    fetch(url)
      .then(response => response.json(),
      error => console.log('An error occurred.', error))
      .then(res => {
        console.log(res);
        this.setState({
          gameId: res.GameId,
          guessed: res.Guessed,
          message: res.Message,
          gameState: res.State,
        });
      });
  };

  GuessGetOnChange = e => {
    const { value } = e.target;
    this.setState({
      GuessQuery: value
    });

    this.GuessGetSearch(value);
  };

  GuessGetSearch = GuessQuery => {
    const url = `http://127.0.0.1:5000/guesses/${GuessQuery}`;
    fetch(url)
      .then(response => response.json(),
      error => console.log('An error occurred.', error))
      .then(res => {
        console.log(res);
        this.setState({
          GuessgameId: res.GuessId,
          Guessguessed: res.Guessed,
          GuessgameState: res.State,
        });
      });
  };

  GamePostOnChange = e => {
    const { value } = e.target;
    this.setState({
      GamePostQuery: value
    });

    this.GamePostSearch(value);
  };

  GamePostSearch = GamePostQuery => {
    const url = `http://127.0.0.1:5000/games/${GamePostQuery}`;
    fetch(url, {
      method: 'post',
      body: {'game_id': GamePostQuery},
      headers:{'Content-Type': 'application/json'}
    })
      .then(response => response.json(),
      error => console.log('An error occurred.', error))
      .then(res => {
        console.log(res);
        this.setState({
          GamePostgameId: res.GameId,
          GamePostguessed: res.Guessed,
          GamePostgameState: res.State,
          GamePostmessage: res.Message,
        });
      });
  };

  GuessPostOnChange = e => {
    const { value } = e.target;
    this.setState({
      GuessPostQuery: value
    });

    this.GuessPostSearch(value);
  };

  GuessPostSearch = GuessPostQuery => {
    var id = GuessPostQuery.split(",")[0];
    var guess = GuessPostQuery.split(",")[1];
    const url = `http://127.0.0.1:5000/guesses/${id}?letter=${guess}`;
    fetch(url, {
      method: 'post',
      body: {'game_id': GuessPostQuery},
      headers:{'Content-Type': 'application/json'}
    })
      .then(response => response.json(),
      error => console.log('An error occurred.', error))
      .then(res => {
        console.log(res);
        this.setState({
          GuessPostguessed: res.Guessed,
          GuessPostgameState: res.State,
          GuessPostmessage: res.Message,
        });
      });
  };

  render() {
    return (
      <div>
      <div>
        <h1>Fetch a game given its identifier</h1>
        <h3>GameId: {this.state.gameId}</h3>
        <h3>Guessed: {this.state.guessed}</h3>
        <h3>Message: {this.state.message}</h3>
        <h3>GameState: {this.state.gameState}</h3>
        <form>
            <input
              type="text"
              className="search-box"
              placeholder="Enter Game ID to fetch"
              onChange={this.GameGetOnChange}
            />
        </form>
        </div>

        <div>
        <h1>Fetch a guess history the game identifier</h1>
        <h3>GameId: {this.state.GuessgameId}</h3>
        <h3>Guessed: {this.state.Guessguessed}</h3>
        <h3>GameState: {this.state.GuessgameState}</h3>
        <form>
            <input
              type="text"
              className="search-box"
              placeholder="Enter Game ID to fetch"
              onChange={this.GuessGetOnChange}
            />
        </form>
        </div>

        <div>
        <h1>Create a new game given the new identifier</h1>
        <h3>GameId: {this.state.GamePostgameId}</h3>
        <h3>Guessed: {this.state.GamePostguessed}</h3>
        <h3>Message: {this.state.GamePostmessage}</h3>
        <h3>GameState: {this.state.GamePostgameState}</h3>
        <form>
            <input
              type="text"
              className="search-box"
              placeholder="Enter Game ID to start"
              onChange={this.GamePostOnChange}
            />
        </form>
        </div>

        <div>
        <h1>Make a guess to the game with the given game identifier</h1>
        <h2>Enter Game ID to make your guess and your guessed character, separated by a ',', for example -> 123,a</h2>
        <h3>Guessed: {this.state.GuessPostguessed}</h3>
        <h3>Message: {this.state.GuessPostmessage}</h3>
        <h3>GameState: {this.state.GuessPostgameState}</h3>
        <form>
            <input
              type="text"
              className="search-box"
              placeholder="Enter Game ID to make your guess and your guessed character, separated by a ','"
              onChange={this.GuessPostOnChange}
            />
        </form>
        </div>
        </div>
    );
  }
}

export default App;
