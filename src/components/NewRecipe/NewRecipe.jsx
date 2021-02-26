import React from "react";
import axios from "axios";

import css from "./NewRecipe.module.css";
import Burger from "../../assets/images/burger.png";

class NewRecipe extends React.Component {
  state = {
    NewRecipe: {},
    RecipeImg: {}
  }

  getNewRecipe = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/recipes`)
      .then(({data}) => {
        console.log(JSON.parse(data.data[2].img_rcp));
        this.setState({
          NewRecipe: data.data[0],
          RecipeImg: JSON.parse(data.data[0].img_rcp),
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getNewRecipe();
  }

  render() {
    const { NewRecipe, RecipeImg } = this.state;
    return (
      <main id={css.Main}>
        <div style={{ float: "none" }}></div>
        <div className='container'>
          <div className={`${css.HeadLine} mb-5`}>
            <h2>New Recipe</h2>
          </div>
          <div className={css.HeroImage}>
            <img src={RecipeImg[0]} alt='burger' className='img-fluid rounded' />
          </div>
          <div className={css.HeroText}>
            <h2>{NewRecipe.title_rcp}</h2>
            <p className={`${css.LongParagraph} mb-4`}>
              {NewRecipe.desc_rcp}
            </p>
            <button type='button' className={`btn btn-warning ${css.Btn}`}>
              Learn More
            </button>
          </div>
        </div>
        <div style={{ float: "none" }}></div>
      </main>
    );
  }
}

export default NewRecipe;