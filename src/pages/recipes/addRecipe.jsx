import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";

import Footer from "../../components/Footer/Footer";
import Recipe from "../../components/Recipe/Recipesadd";



class AddRecipe extends Component {
  render() {
    return (
      <div>
        <Navbar />
     
        <Recipe />
        <Footer />
      </div>
    );
  }
}

export default AddRecipe;
