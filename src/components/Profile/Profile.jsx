import React, { Component } from "react";
import { Container, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

import profile from "./Profile.module.css";
import ImageProfile from "../../assets/images/profile/profile.png";
import EditProfileBtn from "../../assets/icons/edit-image.png";
const API_URL = process.env.REACT_APP_URL
class Profile extends Component {
  state = {
    showEdit: false,
    profileData: [],
    myrecipe: [],
    likedrecipe: [],
    savedrecipe: [],
    showModal: false,
    showModalPass: false,
    file: null,
    newPassword: "",
  };

  //Modal Photo
  handleClose = () =>
    this.setState({
      showModal: false,
    });
  handleShow = () =>
    this.setState({
      showModal: true,
    });
  //Modal Pass
  handleClosePass = () =>
    this.setState({
      showModalPass: false,
    });
  handleShowPass = () =>
    this.setState({
      showModalPass: true,
    });

  myListActive = (e) => {
    const ListId = e.target.dataset.id;
    const buttons = document.querySelectorAll("." + profile.ItemTitle);
    const contentPartSection = document.querySelectorAll(
      "." + profile.ItemList
    );
    // remove class active-type and show-section
    buttons.forEach((item) => item.classList.remove(profile.ItemTitleActive));
    contentPartSection.forEach((item) =>
      item.classList.remove(profile.ItemListActive)
    );
    // add class active-type and show-section
    e.target.classList.add(profile.ItemTitleActive);
    document.querySelector(`#${ListId}`).classList.add(profile.ItemListActive);
  };

  updateEditSection = () => {
    if (this.state.showEdit) {
      this.setState({
        showEdit: false,
      });
    } else {
      this.setState({
        showEdit: true,
      });
    }
  };

  getUser = async () => {
    const userid = await localStorage.getItem("userId");
    axios
      .get(`${API_URL}/user/${userid}`)
      .then((res) => {
        const profile = res.data.data;
        this.setState({
          profileData: profile,
        });
        //console.log(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getMyRecipe = async () => {
    const userid = await localStorage.getItem("userId");
    axios
      .get(`${API_URL}/recipes/${userid}`)
      .then((res) => {
        this.setState({
          myrecipe: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getLikedRecipe = async () => {
    const userid = await localStorage.getItem("userId");
    axios
      .get(`${API_URL}/likes/${userid}`)
      .then((res) => {
        this.setState({
          likedrecipe: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getSavedRecipe = async () => {
    const userid = await localStorage.getItem("userId");
    axios
      .get(`${API_URL}/saves/${userid}`)
      .then((res) => {
        this.setState({
          savedrecipe: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changePhoto = async () => {
    const data = new FormData();
    data.append("img", this.state.file);
    const userid = await localStorage.getItem("userId");
    await axios
      .patch(`${API_URL}/user/${userid}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      showModal: false,
    });
    await this.getUser();
    console.log("change photo");
  };

  changePass = async () => {
    const data = {
      password_user: this.state.newPassword,
    };
    console.log(data);
    const userid = await localStorage.getItem("userId");
    await axios
      .patch(`${API_URL}/newpass/${userid}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.setState({
      showModalPass: false,
    });
  };

  passHandler = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  };

  componentDidMount = () => {
    console.log("did mount");
    this.getUser();
    this.getMyRecipe();
    this.getLikedRecipe();
    this.getSavedRecipe();
  };

  render() {
    console.log(this.state.file);
    const { myrecipe, likedrecipe, savedrecipe, profileData } = this.state;
    // console.log(myrecipe);
    console.log("RE RENDER HERE");
    return (
      <>
        <div className={profile.Section}>
          {profileData &&
            profileData.map(({ name_user, photo_user }) => {
              return (
                <>
                  <div
                    className={profile.Image + " mx-auto"}
                    style={{
                      backgroundImage: `url(${
                        photo_user !== null
                          ? JSON.parse(photo_user)
                          : ImageProfile
                      })`,
                    }}
                  >
                    <img
                      src={EditProfileBtn}
                      className={profile.EditButton}
                      alt=""
                      height="24px"
                      width="24px"
                      onClick={this.updateEditSection}
                    />
                  </div>
                  <div className={"mx-auto text-center "}>
                    <p className={profile.Username + " mt-2"}>{name_user}</p>
                  </div>
                </>
              );
            })}
          <div
            className={
              this.state.showEdit
                ? `${profile.EditSection} mx-auto ${profile.Show}`
                : `${profile.EditSection} mx-auto `
            }
          >
            <button
              className={profile.DefaultBtn + " d-block"}
              onClick={this.handleShow}
            >
              Change Photo Profile
            </button>
            <button
              className={profile.DefaultBtn + " d-block"}
              onClick={this.handleShowPass}
            >
              Change Password
            </button>
          </div>
        </div>
        <Container>
          <div className="my-list d-flex mt-5">
            <p
              className={profile.ItemTitle + " " + profile.ItemTitleActive}
              data-id={"MySection"}
              onClick={this.myListActive}
            >
              My Recipe
            </p>
            <p
              className={profile.ItemTitle}
              data-id={"SavedSection"}
              onClick={this.myListActive}
            >
              Saved Recipe
            </p>
            <p
              className={profile.ItemTitle}
              data-id={"LikedSection"}
              onClick={this.myListActive}
            >
              Liked Recipe
            </p>
          </div>
        </Container>
        <hr />
        <Container>
          <div
            className={profile.ItemList + " " + profile.ItemListActive}
            id="MySection"
          >
            <div className={profile.CardWrapper}>
              {myrecipe &&
                myrecipe.map(({ title_rcp, img_rcp }) => {
                  return (
                    <div
                      className={profile.CardList}
                      style={{
                        backgroundImage: `url('${JSON.parse(img_rcp)}')`,
                      }}
                    >
                      <h1>{title_rcp}</h1>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={profile.ItemList} id="SavedSection">
            <div className={profile.CardWrapper}>
              {savedrecipe &&
                savedrecipe.map(({ title_rcp, img_rcp }) => {
                  return (
                    <div
                      className={profile.CardList}
                      style={{
                        backgroundImage: `url('${JSON.parse(img_rcp)}')`,
                      }}
                    >
                      <h1>{title_rcp}</h1>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={profile.ItemList} id="LikedSection">
            <div className={profile.CardWrapper}>
              {likedrecipe &&
                likedrecipe.map(({ title_rcp, img_rcp }) => {
                  return (
                    <div
                      className={profile.CardList}
                      style={{
                        backgroundImage: `url('${JSON.parse(img_rcp)}')`,
                      }}
                    >
                      <h1>{title_rcp}</h1>
                    </div>
                  );
                })}
            </div>
          </div>
        </Container>
        {/* Modal Change Photo */}
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Change Photo Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                this.setState({ file: file });
              }}
            />
            {/* <img src={this.state.file} alt="pict profile" /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.changePhoto}>
              Change Photo Profile
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Modal Change Password */}
        <Modal show={this.state.showModalPass} onHide={this.handleClosePass}>
          <Modal.Header closeButton>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              placeholder="Password"
              onChange={this.passHandler}
            />
            {/* <img src={this.state.file} alt="pict profile" /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClosePass}>
              Close
            </Button>
            <Button variant="primary" onClick={this.changePass}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Profile;
