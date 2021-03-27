import React, { Component } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import Header from "./Header/Header.js";
import Discover from "./Discover/Discover";
import Post from "./PostPage/PostPage";
import ClubPage from "./ClubPage/ClubPage";
import ClubsContext from "./ClubsContext";
import config from "./config";
import SelectSchool from "./SelectSchool/SelectSchool";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [],
      schools: [],
      error: null,
      userSchool: "",
      finalSchool: "Spanish River Community High School",
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
    const fetchURL = `https://api.schooldigger.com/v1.2/schools?st=FL&q=${this.state.userSchool}&appID=${config.appID}&appKey=${config.appKey}`;
    // const fetchURL = `https://api.greatschools.org/search/schools?key=${config.apiKey}&state=FL&q=${this.state.userSchool}`;
    console.log(fetchURL);
    fetch(`${fetchURL}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          schools: data.schoolList,
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

  clickSubmit = () => {
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
            <SelectSchool
              setUserInput={(e) => this.setUserInputSchool(e)}
              clickSchool={(e) => this.clickSchool(e)}
              clickSubmit={() => this.clickSubmit()}
              schools={this.state.schools}
            ></SelectSchool>
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
              return <ClubPage clubs={context.clubs} {...routeProps} />;
            }}
          />
        </div>
      </ClubsContext.Provider>
    );
  }
}
