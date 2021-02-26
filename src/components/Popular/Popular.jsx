import React from "react";
import axios from "axios";

import css from "./Popular.module.css";
import RamenNoodles from "../../assets/images/healthy-bone-broth-ramen.png";

class Popular extends React.Component {
  state = {
    PopularRecipe: {},
    RecipeImg: {}
  }

  getPopularRecipe = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/recipes`)
      .then(({data}) => {
        console.log(JSON.parse(data.data[2].img_rcp));
        this.setState({
          PopularRecipe: data.data[2],
          RecipeImg: JSON.parse(data.data[2].img_rcp),
        });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getPopularRecipe();
  }

  render() {
    const { PopularRecipe, RecipeImg } = this.state;
    return (
      <main>
        <div style={{ float: "none" }}></div>
        <div className='container container-sm'>
          <div className={`${css.HeadLine} mb-5`}>
            <h2>Popular For You!</h2>
          </div>
          <div className={css.HeroImage}>
            <img src={RecipeImg[0]} alt='ramen' className='img-fluid rounded' />
          </div>
          <div className={css.HeroText}>
            <h2>{PopularRecipe.title_rcp}</h2>
            <p className={`${css.LongParagraph} mb-4`}>
              {PopularRecipe.desc_rcp}
            </p>
            <button type='button' className={`btn btn-warning ${css.Btn}`}>
              Learn More
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default Popular;