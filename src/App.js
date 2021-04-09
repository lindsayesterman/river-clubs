import React, { Component } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import Header from "./Header/Header.js";
import Discover from "./Discover/Discover";
import Post from "./PostPage/PostPage";
import ClubPage from "./ClubPage/ClubPage";
import ClubsContext from "./ClubsContext";
import config from "./config";
import srhsLogo from './srhsLogo.png'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      error: null
    };
  }

  componentDidMount() {
    return Promise.all([fetch(`${config.API_ENDPOINT}/clubs`)])
      .then(([clubsRes]) => {
        if (!clubsRes.ok) return clubsRes.json().then((e) => Promise.reject(e));
        return Promise.all([clubsRes.json()]);
      })
      .then(([clubs]) => {
        this.setState({
          clubs,
        });
      })
      .catch((error) => {
        this.setState({ error });
        console.error({ error });
      });
  }

  addClub = (club) => {
    this.setState({
      clubs: [this.state.clubs, club],
    });
  };

  render() {
    const context = {
      clubs: this.state.clubs,
      addClub: (club) => {
        this.addClub(club);
      },
      setAppData: this.setAppData,
    };
    return (
      <ClubsContext.Provider value={context}>
        <div className="app">
          <Route exact path="/">
            <Header />
            <h1 className="front-page-descrip">
              Check out your school's clubs here. Search for information on
              existing clubs or discover new ones. Head to our{" "}
              <Link to="/discover">Discover</Link> page to browse.{" "}
            </h1>
            <img src={srhsLogo}></img>
          </Route>
          <Route
            path="/discover"
            render={(routeProps) => {
              return <Discover clubs={context.clubs} school={this.state.finalSchool} {...routeProps} />;
            }}
          />
          <Route
            path="/post"
            render={(routeProps) => {
              return <Post clubs={context.clubs} school={this.state.finalSchool} {...routeProps} />;
            }}
          />
          <Route
            path="/clubs/:clubId"
            render={(routeProps) => {
              return <ClubPage clubs={context.clubs}  {...routeProps} />;
            }}
          />
        </div>
      </ClubsContext.Provider>
    );
  }
}
