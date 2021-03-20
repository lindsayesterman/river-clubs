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
import SchoolsSelector from "./SchoolsSelector/SchoolsSelector";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      schools: [],
      select: null,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchSchools();
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
    const fetchURL = `https://api.schooldigger.com/v1.2/autocomplete/schools?q=spanish&appID=${config.appID}&appKey=${config.appKey}`;
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
          schools,
          error: null,
        });
        console.log(data);
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
        console.log(err.message);
      });
  };

  setSelected(selected) {
    this.setState({
      selected,
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
    // const demon = this.state.selected
    // ? <Demonym name={this.state.selected['citizen-names']} school={this.state.selected.name}/>
    // : <div className="demonym_app__placeholder">Select a school above</div>;

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
            <div className="selector">
              {error}
              <SchoolsSelector
                schools={this.state.schools}
                changeHandler={(selected) => this.setSelected(selected)}
              />
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
