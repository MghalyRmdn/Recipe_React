import React, { Component } from "react";
// import axios from "axios";
import { postLogin } from '../../redux/actionCreators/auth'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";
import Mama from "../../assets/Group 697.png";
import Background from "../../assets/76c7e3577554580136d5f65222046a21.png";
import { Redirect } from "react-router-dom";


import { connect } from "react-redux";

class Index extends Component {
  state = {
    error: ' ',
    user: {
      email: '',
      password: '',
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
    e.preventDefault();
    if (this.state.user.email === '') {
      this.setState({
        error: 'Please input the email'
      })
    } else if (this.state.user.password === '') {
      this.setState({
        error: 'Please input the password'
      })
    } else {
      const { dispatch } = this.props;
      const data = {
        email_user: this.state.user.email,
        password_user: this.state.user.password,
      };
      // console.log(data)
      await dispatch(postLogin(data))
  
      const { auth } = this.props
  
      if (auth.data.msg) {
        this.setState({
          error: auth.data.msg
        })
      } else {
        localStorage.setItem("token", auth.data.data.token);
        localStorage.setItem("userId", auth.data.data.userId);

        this.setState({
          error: ''
        })

        this.props.history.push('/')
      }
    }

  };
  render() {
    const { auth } = this.props;

    return (
      <div className="container-fluid h-100">
        {auth.isLogin && <Redirect to="/" />}
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
              <h2 className="main font-weight-bold">Welcome</h2>
              <span className="log mt-4 mb-4 font-weight-normal">
                Log In into your existing account
              </span>
              <Form className="w-100 mb-3 mt-3" onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    className="pt-4 pb-4 pl-4 pr-0 input"
                    value={this.state.user.email}
                    onChange={this.userHandler} 
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="pt-4 pb-4 pl-4 pr-0 input"
                    value={this.state.user.password}
                    onChange={this.userHandler}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
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
                  Log In
                </Button>
              </Form>
              <div className="w-100 d-flex justify-content-end">
                <Link to="/forgot" className="log text-decoration-none">
                  Forgot Password?
                </Link>
              </div>
              <span className="text-center mt-3" style={{ color: "#8692A6" }}>
                Don't have an account?
                <Link to="/register" className="main text-decoration-none">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Index);
