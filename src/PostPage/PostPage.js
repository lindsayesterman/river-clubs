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
    this.state = { value: "tech", day_of_week: "monday", time_of_day: "12" };
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
        if (!res.ok || e.target["password"].value != config.teacherAuth) {
          return res.json().then((error) => {
            alert("Incorrect Password. Please try again.");
            console.log(e.target["password"].value);
            console.log(config.teacherAuth);
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
          <label htmlFor="name">Club Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Club Name"
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Include a short description about what your club does!"
            required
          />
          <label htmlFor="google_classroom_code">Google Classroom Code:</label>
          <input
            type="text"
            name="google_classroom_code"
            id="google_classroom_code"
            placeholder="Enter Google Classroom Code"
          />
          <label htmlFor="remind_code">Remind Code:</label>
          <input
            type="text"
            name="remind_code"
            id="remind_code"
            placeholder="Enter Remind Code"
          />
          <label htmlFor="leadership">
            Leadership:
          </label>
          <input
            type="text"
            name="leadership"
            id="leadership"
            placeholder="Include Names Separated by Commas"
          />
          <label htmlFor="topic">Club Topic:</label>
          <select
            id="topic"
            value={this.state.value}
            onChange={this.handleSortChange}
            className="post-select"
          >
          <option value="academic">Academic</option>
          <option value="athletics">Athletics</option>
          <option value="art">Art/Music</option>
          {/* <option value="community">Community Service</option> */}
          <option value="tech">Computer/Technology</option>
          <option value="social">Social</option>
          <option value="science">Science</option>
          <option value="work">Work</option>
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
            <option value="11:15">11:15 am</option>
            <option value="11:30">11:30 am</option>
            <option value="11:45">11:45 am</option>
            <option value="12">12 pm</option>
            <option value="12:15">12:15 pm</option>
            <option value="12:30">12:30 pm</option>
            <option value="12:45">12:45 pm</option>
            <option value="1">1 pm</option>
            <option value="1:15">1:15 pm</option>
            <option value="1:30">1:30 pm</option>
            <option value="1:45">1:45 pm</option>
            <option value="2">2 pm</option>
            <option value="2:15">2:15 pm</option>
            <option value="2:30">2:30 pm</option>
            <option value="2:45">2:45 pm</option>
            <option value="3">3 pm</option>
            <option value="3:15">3:15 pm</option>
            <option value="3:30">3:30 pm</option>
            <option value="3:45">3:45 pm</option>
            <option value="4">4 pm</option>
            <option value="4:15">4:15 pm</option>
            <option value="4:30">4:30 pm</option>
            <option value="4:45">4:45 pm</option>
            <option value="5">5 pm</option>
            <option value="5:15">5:15 pm</option>
            <option value="5:30">5:30 pm</option>
            <option value="5:45">5:45 pm</option>
            <option value="6">6 pm</option>
            <option value="6:15">6:15 pm</option>
            <option value="6:30">6:30 pm</option>
            <option value="6:45">6:45 pm</option>
          </select>
          <label htmlFor="password">Teacher Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
          <button type="submit" className="btn-post">
            Post
          </button>
        </form>
      </div>
    );
  }
}
