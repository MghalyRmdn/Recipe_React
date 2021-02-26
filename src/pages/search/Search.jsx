import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import SearchItems from "../../components/searchItems";
import ListRecipe from "../../components/ListRecipe/ListRecipe";
import { Container } from "react-bootstrap";
import axios from "axios";

const base_url = process.env.REACT_APP_URL + "/search?";
console.log(base_url);
const urlParams = new URLSearchParams(window.location.search);

console.log(typeof urlParams);
console.log(urlParams);

export default class SearchPage extends Component {
  state = {
    items: [],
    page: {},
  };

  getItems = async () => {
    axios
      .get(base_url + urlParams)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          items: data.recipe,
          page: data.pageInfo,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getItems();
    console.log("didMount");
  };

  render() {
    console.log(this.state);
    console.log("render");
    const { items } = this.state;
    console.log(items);
    console.log(this.props);
    return (
      <>
        <Navbar />
        <div className="container">
          <Container>
            <h3 className="session-tag gap-content">Results</h3>
          </Container>
          <div style={{ float: "left", width: "80%", height: "80%" }}>
            {items.length !== 0 &&
              items.map(({ id_rcp, title_rcp, img_rcp }) => {
                return (
                  <>
                    <ListRecipe img={JSON.parse(img_rcp)} title={title_rcp} />
                  </>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}
