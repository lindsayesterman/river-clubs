import React, { Component } from "react";
import "./Discover.css";
import Header from "../Header/Header";
import Club from "../Club/Club";
import ClubsContext from "../ClubsContext";
import { Link } from "react-router-dom";
import { sortBy } from "lodash";
import { findSchoolClubs, clubsFoundFromSearch} from '../helper.js'

export default class Discover extends Component {
  static contextType = ClubsContext;

  constructor(props) {
    super(props);
    this.state = {
      value: "old",
      sortedResults: findSchoolClubs(this.props.clubs, this.props.school) || this.props.clubs,
      searched: "",
    };
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(event) {
    let sorted;
    const topicClicked = event.target.value;
    if (event.target.value === "recent") {
      sorted = sortBy(this.state.sortedResults, ["date_created"]).reverse();
    } else if (event.target.value === "old") {
      sorted = sortBy(this.state.sortedResults, ["date_created"]);
    } else if (event.target.value === "alpha") {
      sorted = sortBy(this.state.sortedResults, ["name"]);
    } else {
      const clubWithTopic = (clubs = [], clubTopic) =>
        clubs.filter((club) => club.topic === clubTopic);
      sorted = clubWithTopic(this.state.sortedResults, topicClicked);
    }
    this.setState({ value: event.target.value, sortedResults:sorted });
  }

  handleSearchClub = (e) => {
    e.preventDefault();
    const { searched } = this.state;
    let sorted = clubsFoundFromSearch(this.state.sortedResults, searched);
    this.setState({ sortedResults:sorted });
  };

  updateSearchHandle = (e) => {
    this.setState({ searched: e.target.value });
  };

  render() {
    const schoolClubs = findSchoolClubs(this.context.clubs, this.props.school)
    const clubs = this.state.sortedResults;
    return (
      <div className="discover">
        <Header />
        <form className="searchBar" onSubmit={(e) => this.handleSearchClub(e)}>
          <input
            type="text"
            name="searched"
            id="searched"
            onChange={this.updateSearchHandle}
            placeholder="Girls Who Code"
          ></input>
          <button className="subSearch" type="submit">
            Search
          </button>
        </form>
        <select
          id="sort"
          value={this.state.value}
          onChange={this.handleSortChange}
        >
          <option value="old">Oldest</option>
          <option value="recent">Most Recent</option>
          <option value="alpha">Alphabetical</option>
          <option value="academic">Academic</option>
          <option value="athletics">Athletics</option>
          <option value="art">Art/Music</option>
          <option value="community">Community Service</option>
          <option value="tech">Computer/Technology</option>
          <option value="social">Social</option>
          <option value="science">Science</option>
          <option value="work">Work</option>
          <option value="other">Other</option>
        </select>
        <ul className="disover-clubs">
          {clubs.map((club) => (
            <Link to={`/clubs/${club.id}`} key={club.id}>
              <Club
                name={club.name}
                description={club.description}
                id={club.id}
                key={club.id}
                {...club}
              />
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}
