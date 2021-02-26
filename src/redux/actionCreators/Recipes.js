import axios from "axios";
import { uploadNewRecipe } from "../../utils/Api"
import { uploadRecipe } from './actionType';



const getUrl = process.env.REACT_APP_URL
export const getRecipeCreator = () => {
    
    const headers = {};
    return {
        type: "GEt_ALL_RECIPES",
        payload: axios.get(getUrl + "/recipes" , { headers }),
    };
};

export const getSingleRecipe = (id) => {
    return {
        type: "GET_SINGLE_RECIPE",
        payload: axios.get(getUrl + "/recipe/" + id),
    }
}


export const uploadRecipeCreator = (title_rcp,img_rcp,ingredients_rcp,video_rcp)=>{
    return {
      type:uploadNewRecipe,
      payload:uploadRecipe(title_rcp,img_rcp,ingredients_rcp,video_rcp),
    }
  }
