import React, { Component } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import Header from "./Header/Header.js";
import Discover from "./Discover/Discover";
import Post from "./PostPage/PostPage";
import ClubPage from "./ClubPage/ClubPage";
import ClubsContext from "./ClubsContext";
import config from "./config";
import srhsLogo from "./srhsLogo.png";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      schools: [],
      error: null,
      userSchool: "spanish",
      finalSchool:""
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

  fetchSchools = () => {
    const fetchURL = `https://api.schooldigger.com/v1.2/autocomplete/schools?q=${this.state.userSchool}&appID=${config.appID}&appKey=${config.appKey}`;
    console.log(fetchURL);
    fetch(`${fetchURL}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        const schools = Object.keys(data).map((school, i) => (
          <li key={i}>{school.city}</li>
        ));
        this.setState({
          schools: data.schoolMatches,
          error: null,
        });
        console.log(this.state.schools);
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
        console.log(err.message);
      });
  };

  setUserInputSchool(e) {
    this.setState({ userSchool: e.target.value });
    console.log(this.state.userSchool)
    this.fetchSchools();
  }

  clickSchool(e){
    this.setState({finalSchool: e.target.innerHTML})
    console.log(this.state.finalSchool)
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
    const error = this.state.error ? (
      <div className="demonym_app__error">{this.state.error}</div>
    ) : (
      ""
    );

    return (
      <ClubsContext.Provider value={context}>
        <div className="app">
          <Route exact path="/">
            <Header />
            <h1 className="front-page-descrip">
              Check out Spanish River Clubs here. Search for information on
              existing clubs or discover new ones. Head to our{" "}
              <Link to="/discover">Discover</Link> page to browse.{" "}
            </h1>
            <input
              type="text"
              name="userSchool"
              id="userSchool"
              autoComplete="on"
              onChange={this.setUserInputSchool.bind(this)}
            ></input>
            <div className="school-options">
              {this.state.schools.map((obj) => (
                <button onClick={this.clickSchool.bind(this)}>{obj.schoolName}</button>
              ))}
            </div>
            <img className="sr-logo" alt="sr-logo" src={srhsLogo}></img>
          </Route>
          <Route
            path="/discover"
            render={(routeProps) => {
              return <Discover clubs={context.clubs} {...routeProps} />;
            }}
          />
          <Route
            path="/post"
            render={(routeProps) => {
              return <Post clubs={context.clubs} {...routeProps} />;
            }}
          />
          <Route
            path="/clubs/:clubId"
            render={(routeProps) => {
              return <ClubPage clubs={context.clubs} {...routeProps} />;
            }}
          />
        </div>
      </ClubsContext.Provider>
    );
  }
}
