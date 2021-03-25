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
      finalSchool: "",
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

  setUserInputSchool = (e) => {
    this.setState({ userSchool: e.target.value });
    console.log(this.state.userSchool);
  };

  clickSchool = (e) => {
    this.setState({ finalSchool: e.target.innerHTML });
    console.log(this.state.finalSchool);
    // alert(`You've selected ${this.state.finalSchool} as your school! Head to the discover page to check out clubs posted there.`)
  };

  clickSubmit = (e) => {
    this.fetchSchools();
  };

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
              Check out your school's clubs here. Search for information on
              existing clubs or discover new ones. Head to our{" "}
              <Link to="/discover">Discover</Link> page to browse.{" "}
            </h1>
            <input
              type="text"
              name="userSchool"
              id="userSchool"
              autoComplete="on"
              onChange={(e) => this.setUserInputSchool(e)}
            ></input>
            <button onClick={(e) => this.clickSubmit(e)} type="submit">
              Submit
            </button>
            <div className="school-options">
              {this.state.schools.map((obj, i) => (
                <button key={i} onClick={(e) => this.clickSchool(e)}>
                  {obj.schoolName}
                </button>
              ))}
            </div>
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
