import React from "react";
import { withRouter, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import css from "./Header.module.css";
import SearchIcon from "../../assets/icons/Search.svg";
// import axios from "axios";

class Header extends React.Component {
  state = {
    title_rcp: "",
  };

  changeHandler = (e) => {
    this.setState({ title_rcp: e.target.value });
  };
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      window.location.href =
        "http://localhost:3000/search?title=" + this.state.title_rcp;
    }
  };
  render() {
    const { title_rcp } = this.state;
    console.log(title_rcp);
    return (
      <header>
        {/* NAVBAR */}
        <Navbar />

        {/* HERO TEXT */}
        <div className={`${css.HeroTextBox} container`}>
          <h1>
            Discover Recipe
            <br />& Delicious Food
          </h1>
          <div className={`${css.SearchArea} input-group`}>
            <div className={css.SearchBar}>
              <img src={SearchIcon} className={css.SearchIcon} alt="search" />
              <input
                type="text"
                name="title_rcp"
                className={css.Search}
                placeholder="Search Restaurant, Food"
                value={title_rcp}
                onChange={this.changeHandler}
                onKeyPress={this.handleKeyPress}
              />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
