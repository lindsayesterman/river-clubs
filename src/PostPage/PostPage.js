import React, { Component } from "react";
import Header from "../Header/Header.js";
import "./PostPage.css";
import config from "../config.js";
import ClubsContext from "../ClubsContext";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    this.state = { value: "other", day_of_week: "monday", time_of_day: "12" };
  }

  static contextType = ClubsContext;

  handleSortChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleChangeDay = (event) => {
    this.setState({ day_of_week: event.target.value });
  };

  handleChangeTime = (event) => {
    this.setState({ time_of_day: event.target.value });
  };

  handlePostClub = (e) => {
    e.preventDefault();
    const club = {
      name: e.target["name"].value.trim(),
      description: e.target["description"].value,
      topic: e.target["topic"].value,
      leadership: e.target["leadership"].value,
      day_of_week: e.target["day_of_week"].value,
      time_of_day: e.target["time_of_day"].value,
      google_classroom_code: e.target["google_classroom_code"].value,
      remind_code: e.target["remind_code"].value,
      date_created: new Date(),
    };
    this.setState({ error: null });
    fetch(`${config.API_ENDPOINT}/clubs`, {
      method: "POST",
      body: JSON.stringify(club),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then((data) => {
        this.context.addClub(data);
        this.props.history.push("/discover");
        window.location.reload();
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    return (
      <div className="post">
        <Header />
        <form
          className="club-proposal"
          onSubmit={(e) => this.handlePostClub(e)}
        >
          <h1 className="post-h1">Post a Club</h1>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Girls Who Code"
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Learn how to create websites, code in JavaScript, and make friends!"
            required
          />
          <label htmlFor="topic">Topic:</label>
          <select
            id="topic"
            value={this.state.value}
            onChange={this.handleSortChange}
            className="post-select"
          >
            <option value="academic">Academic</option>
            <option value="athletics">Athletics</option>
            <option value="art">Art/Music</option>
            <option value="tech">Computer/Technology</option>
            <option value="social">Social</option>
            <option value="science">Science</option>
            <option value="sork">Work</option>
            <option value="other">Other</option>
          </select>
          <label htmlFor="day_of_week">Meeting Day:</label>
          <select
            id="day_of_week"
            value={this.state.day_of_week}
            onChange={this.handleChangeDay}
            className="post-select"
          >
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thurdsay</option>
            <option value="friday">Friday</option>
          </select>
          <label htmlFor="time_of_day">Time:</label>
          <select
            id="time_of_day"
            className="post-select"
            value={this.state.time_of_day}
            onChange={this.handleChangeTime}
          >
            <option value="11">11 am</option>
            <option value="12">12 pm</option>
            <option value="1">1 pm</option>
            <option value="2">2 pm</option>
            <option value="3">3 pm</option>
            <option value="4">4 pm</option>
            <option value="5">5 pm</option>
            <option value="6">6 pm</option>
          </select>
          <label htmlFor="google_classroom_code">Google Classroom Code:</label>
          <input
            type="text"
            name="google_classroom_code"
            id="google_classroom_code"
            placeholder="8ftgh9"
          />
          <label htmlFor="remind_code">Remind Code:</label>
          <input
            type="text"
            name="remind_code"
            id="remind_code"
            placeholder="gwcc2020"
          />
          <label htmlFor="leadership">
            Leadership (enter names separated by commas):
          </label>
          <input
            type="text"
            name="leadership"
            id="leadership"
            placeholder="Sally E., Sarah F., Sam G."
          />
          <button type="submit" className="btn-post">
            Post
          </button>
        </form>
      </div>
    );
  }
}
