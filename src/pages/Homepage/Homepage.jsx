// Halaman landing page
import Header from "../../components/Header/Header";
import Popular from "../../components/Popular/Popular";
import NewRecipe from "../../components/NewRecipe/NewRecipe";
import PopularRecipe from "../../components/PopularRecipe/PopularRecipe";

function Homepage() {
  return(
    <>
      <Header />
      <Popular />
      <NewRecipe />
      <PopularRecipe />
    </>
  )
}

export default Homepage;