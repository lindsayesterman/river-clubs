import React, { Component } from "react";
import "./ClubPage.css";
import Header from "../Header/Header";
import { findClub } from "../helper.js";
import ClubsContext from '../ClubsContext.js'

export default class ClubPage extends Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  static contextType = ClubsContext;

  render() {
    const { clubs = [] } = this.props
    const { clubId } = this.props.match.params;
    const club = findClub(clubs, parseFloat(clubId))
    return (
      <div className="club-page">
        <Header />
        <div className="container-info">
        <h1 className="info">{club.name}</h1>
        <h3 className="info">Description: {club.description.charAt(0).toUpperCase() + club.description.slice(1)}</h3>
        <h3 className="info">Topic: {club.topic.charAt(0).toUpperCase() + club.topic.slice(1)}</h3>
        <h3 className="info">Meeting Times: {club.day_of_week.charAt(0).toUpperCase() + club.day_of_week.slice(1)} at {club.time_of_day}</h3>
        <h3 className="info">Google Classroom Code: {club.google_classroom_code}</h3>
        <h3 className="info">Remind Code: {club.remind_code}</h3>
        <h3 className="info">Creator: {club.leadership}</h3>
        </div>
      </div>
    );
  }
}
