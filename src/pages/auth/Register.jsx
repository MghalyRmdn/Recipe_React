import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import "./index.css";
import Mama from "../../assets/Group 697.png";
import Background from "../../assets/76c7e3577554580136d5f65222046a21.png";
// import axios from "axios";
import { postRegister } from '../../redux/actionCreators/auth'


class Register extends Component {
  state = {
    error: '',
    user: {
      name_user: '',
      email_user: '',
      phone_user: '',
      password_user: '',
      confirm_password_user: '',
    }
  }

  userHandler = (e) => {
    const value = e.target.value
    this.setState({
      user: {
        ...this.state.user,

        [e.target.name]: value
      }
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const verify = [this.state.user.name_user, this.state.user.email_user, this.state.user.phone_user, this.state.user.password_user, this.state.user.confirm_password_user]

    console.log(this.state)
    if (verify.includes('')) {
      this.setState({
        error: 'Please fill the form'
      })
    } else if (this.state.user.password_user !== this.state.user.confirm_password_user) {
      this.setState({
        error: 'Password is incorrect'
      })
    } else {
      const data = {
        name_user: this.state.user.name_user,
        email_user: this.state.user.email_user,
        phone_user: this.state.user.phone_user,
        password_user: this.state.user.password_user,
      };

      await this.props.dispatch(postRegister(data))

      const { auth } = this.props
      
      if ( auth.data.msg ) {
        this.setState({
          error: auth.data.msg
        })
      } else {
        this.setState({
          error: ''
        })
        this.props.history.push("/login");
      }
    }
  };

  render() {
    return (
      <div className="container-fluid h-100">
        <div className="row">
          <div
            className="position-relative d-none d-md-block col-md-4 col-lg-6 p-0"
            style={{ backgroundColor: "yellow" }}
          >
            <img
              src={Background}
              alt="background"
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="w-100 full"
            />
            <div className="mask h-100 w-100 d-flex justify-content-center align-items-center">
              <img src={Mama} alt="logo" />
            </div>
          </div>
          <div className="full d-flex justify-content-center align-items-center col-12 col-md-8 col-lg-6">
            <div className="col-10 col-md-8 col-xl-6 d-flex flex-column justify-content-center align-items-center font-weight-medium">
              <h2 className="main font-weight-bold">Lets get started !</h2>
              <span
                className="log mt-4 mb-4 font-weight-normal text-center"
                style={{ fontSize: "15px" }}
              >
                Create new account to access all features
              </span>
              <Form className="w-100 mb-3 mt-3" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name_user"
                    placeholder="Name"
                    value={this.state.user.name_user}
                    className="pt-4 pb-4 pl-4 pr-0 input"
                    onChange={this.userHandler}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address*</Form.Label>
                  <Form.Control
                    type="email"
                    name="email_user"
                    placeholder="Enter email address"
                    value={this.state.user.email_user}
                    className="pt-4 pb-4 pl-4 pr-0 input"
                    onChange={this.userHandler}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone_user"
                    placeholder="08xxxxxxxxxx"
                    value={this.state.user.phone_user}
                    className="pt-4 pb-4 pl-4 pr-0 input"
                    onChange={this.userHandler}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Create New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password_user"
                    placeholder="Create New Password"
                    value={this.state.user.password_user}
                    className="pt-4 pb-4 pl-4 pr-0 input"
                    onChange={this.userHandler}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicConfirmPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm_password_user"
                    placeholder="New Password"
                    value={this.state.user.confirm_password_user}
                    className="pt-4 pb-4 pl-4 pr-0 input"
                    onChange={this.userHandler}
                  />
                </Form.Group>
                <Form.Group controlId="errors">
                  <span className="text-danger mb-2" style={{ fontFamily: 'Airbnb Cereal App Light' }}>{this.state.error}</span>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="I agree to terms & conditions"
                    required
                  />
                </Form.Group>
                <Button
                  variant="warning"
                  type="submit"
                  className="w-100 btn-main pt-2 pb-2 font-weight-medium"
                >
                  Register Account
                </Button>
              </Form>
              <div className="w-100 d-flex">
                <div className="w-100">
                  <span className="log font-weight-normal d-flex justify-content-center">
                    Already have account?
                    <Link to="/login" className="main text-decoration-none">
                      Log in Here
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapsStateToProps)(Register)
