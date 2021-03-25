import React, { Component } from "react";
import "./ClubPage.css";
import Header from "../Header/Header";
import { findClub } from "../helper.js";
import ClubsContext from "../ClubsContext.js";

export default class ClubPage extends Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  static contextType = ClubsContext;

  makeEachWordUpperCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  // capitalizeFirstLetter(str){
  //     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  // }

  ifNotNull = (f) => {
    if (f == null) {
      return null;
    }
  };

  render() {
    const { clubs = [] } = this.props;
    const { clubId } = this.props.match.params;
    const club = findClub(clubs, parseFloat(clubId));
    const noInfo = "";
    return (
      <div className="club-page">
        <Header />
        <div className="container-info">
          <h1 className="info">{club.name}</h1>
          <h3 className="info">
            Description:{" "}
            {club.description.charAt(0).toUpperCase() +
              club.description.slice(1)}
          </h3>
          <h3 className="info">
            Topic: {club.topic.charAt(0).toUpperCase() + club.topic.slice(1)}
          </h3>
          <h3 className="info">
            Meeting Times:{" "}
            {club.day_of_week.charAt(0).toUpperCase() +
              club.day_of_week.slice(1)}{" "}
            at {club.time_of_day}
          </h3>
          <h3 className="info">
            {club.google_classroom_code.length > 0
              ? "Google Classroom Code: " + club.google_classroom_code
              : noInfo}
          </h3>
          <h3 className="info">
            {club.remind_code.length > 0
              ? "Remind Code: " + club.remind_code
              : noInfo}
          </h3>
          <h3 className="info">
            Creator: {this.makeEachWordUpperCase(club.leadership)}
          </h3>
        </div>
      </div>
    );
  }
}
