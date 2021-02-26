import React from "react";

import css from "./ListRecipe.module.css";

const ListRecipe = ({img, title}) => {
  return (
    <div className={css.Box}>
      <img src={img} alt={title} className='img-fluid' />
      <p className={css.BottomLeft}>{title}</p>
    </div>
  );
}

export default ListRecipe;