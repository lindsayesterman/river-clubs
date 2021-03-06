import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className="nav-bar" >
        <Link to="/">
          <h1 className="title">Hack River</h1>
        </Link>
        <Link to="/discover">
          <h3 className="right">Discover Clubs</h3>
        </Link>
        <Link to="/post">
          <h3 className="right">Post a Club</h3>
        </Link>
      </div>
    );
  }
}
