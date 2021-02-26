import React, { Component } from "react";
import { Jumbotron, Form, Button } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";

// import { uploadRecipeCreator } from "../../redux/actionCreators/Recipes";
// import squareImg from "../../assets/icons/imageupload.png";
import axios from "axios";


class Recipesadd extends Component {
  
    state = {
        title_rcp: '',
        ingridients_rcp: '',
        desc_rcp: '',
        img_rcp: null,
        video_rcp: null,
        file: ''
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
    }

    handleFile = (e) => {
        if ( e.target.name === 'img' ) {
            console.log('image')
            let img_rcp = e.target.files
            // file: URL.createObjectURL(event.target.files[0]),
            this.setState({
                img_rcp: img_rcp,
                file: URL.createObjectURL(e.target.files[0])
            })
        } else {
            console.log('videos')

            let video_rcp = e.target.files
            this.setState({video_rcp: video_rcp})
        }
    }

    submitHandler = e => {
        e.preventDefault()
        let params = {
            title_rcp: this.state.title_rcp,
            ingridients_rcp: this.state.ingridients_rcp,
            desc_rcp: this.state.desc_rcp,
            img: this.state.img_rcp,
            videos: this.state.video_rcp,
        }

        console.log(this.state)

        let formdata = new FormData()
        formdata.append('id_user', 19)
        formdata.append('title_rcp', params.title_rcp)
        formdata.append('ingridients_rcp', params.ingridients_rcp)
        formdata.append('desc_rcp', params.desc_rcp)
        for ( let i = 0; i < params.img.length; i++ ) {
            // formdata.append("img", params.img);
            formdata.append("img", params.img[i]);

            // formdata.append()
        }
            // console.log(params.img_rcp[i])
        for ( let j = 0; j < params.videos.length; j++ ) {

            formdata.append("videos", params.videos[j]);
        }

        const getUrl = process.env.REACT_APP_URL

        // const FormData = require('form-data')
        // const qs = require('querystring')
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
        }

        
        axios.post(getUrl + '/recipes', formdata, config)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
//     this.state = {
//       file: null,
//       fileUpload: [],
//     };
//     this.handleFile = this.handleFile.bind(this);
//   }
//   handleFile(event) {
//     this.setState({
//       file: URL.createObjectURL(event.target.files[0]),
//       fileUpload: event.target.files,
//     });
//   }

//   submitHandler = async (event) => {
//     event.preventDefault()
//     await axios.post(getUrl, this.state)
//     alert('product has been added')
//     this.props.history.push('/')


  render() {
    return (
        <div className='container'>
        <div className="mb4" style={{ width: "99%", height: "auto", marginTop: "60px" }}>
            <div className="card-body">
                <Form encType="multipart/form-data" onSubmit={this.submitHandler}>
                    <Jumbotron style={{height: '480px'}} className="">
                        
                        <div className="row">
                            <div className="col-md-8 row">
                                <input type="file" name='img' onChange={(e)=>this.handleFile(e)} autoComplete='off' placeholder="Add" multiple />
                                <img src={this.state.file} alt="lah" />
                            </div>
                        </div>
                    </Jumbotron>
                    <Form.Group controlId="formBasicText" >
                        <Form.Control type="text" name='title_rcp' autoComplete='off' value={this.state.title_rcp} onChange={this.changeHandler} placeholder="Title" style={{ background: '#F6F5F4' }} />
                    </Form.Group>
                    <Form.Group controlId="formBasicText" >
                        <Form.Control as="textarea" rows={10} name='ingridients_rcp' value={this.state.ingridients_rcp} onChange={this.changeHandler} autoComplete='off' placeholder="Ingredients" style={{ background: '#F6F5F4' }} />
                    </Form.Group>
                    <Form.Group controlId="formBasicText" >
                        <Form.Control as="textarea" rows={10} name='desc_rcp' value={this.state.desc_rcp} onChange={this.changeHandler} autoComplete='off' placeholder="Description" style={{ background: '#F6F5F4' }} />
                    </Form.Group>
                    {/* <Form.Group controlId="formBasicText">
                        <Form.Control type="text" name='video' autoComplete='off' placeholder="Video" style={{ background: '#F6F5F4' }} />
                    </Form.Group> */}
                     <Jumbotron style={{height: '280px'}} className="">
                        
                        <div className="row">
                            <div className="col-md-8 row">
                                <input type="file" name='video_rcp' onChange={(e)=>this.handleFile(e)} autoComplete='off' placeholder="Add" multiple />
                                {/* <img src={this.state.file} /> */}
                            </div>
                        </div>
                    </Jumbotron>
                    <div className='d-flex justify-content-center'>
                    <Button variant="warning" type="submit" style={{width: '426px', color: 'white'}}>
                        Post
                    </Button>
                    </div>
                </Form>
            </div>
        </div >
    </div>
    );
  }
}

export default Recipesadd;
