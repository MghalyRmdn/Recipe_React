import Axios from "axios";
import {toast,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const uploadNewRecipe = (id_rcp,title_rcp,img_rcp,ingredients_rcp,video_rcp ,desc_rcp)=>{
    let formData = new FormData();
    formData.append('id_rcp',id_rcp);
    formData.append('title_rcp',title_rcp);
    formData.append('img_rcp',img_rcp);
    formData.append('video_rcp',video_rcp);
    formData.append('ingredients_rcp',ingredients_rcp);
    formData.append('desc_rcp',desc_rcp);


const configHeader = {
    headers: {
      'content-type': 'multipart/form-data',
      contentType: false,
      mimeType: 'multipart/form-data',
      'cache-control': 'no-cache',
      accept: 'application/json',
    },
  };

  return Axios.post(`${process.env.REACT_APP_URL}recipe`,formData,configHeader)
  .then(res=>{
    if(res.data.success){
      toast('Upload Recipe Success',{
        className:'upoloadSuccess',
        draggable:true,
        autoClose:false,
        transition:Bounce,
      })
    }
    else{
      toast('Upload Recipe Failed!, please fill in the form first',{
        className:'uploadFailed',
        draggable:true,
        autoClose:false,
        transition:Bounce,
      })
    }
  })
  .catch(err=>{
    toast.error('Network Error',{
      draggable:true,
      autoClose:false,
    })
  })
}