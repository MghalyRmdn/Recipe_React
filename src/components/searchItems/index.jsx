import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "./search.css";

export default class PopularRecipe extends Component {
  render() {
    const { id_recipe, title, img } = this.props;
    return (
      <>
        <ul className="gallery">
          <li>
            <input type="hidden" name="id_rcp" value={id_recipe} />
            <img className="feed-food" src={img} alt="" />
            <div className="text-block">
              <h4>{title}</h4>
              <p>TEST</p>
            </div>
          </li>
        </ul>
      </>
    );
  }
}
