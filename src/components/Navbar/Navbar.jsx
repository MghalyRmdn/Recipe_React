import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteLogout } from "../../redux/actionCreators/auth"

import css from "./Navbar.module.css";


class Navbar extends React.Component {
  state = {
    isLogin: false
  }

  logout = async (e) => {
    e.preventDefault()
    
    const token = localStorage.getItem('token')
    await this.props.dispatch(deleteLogout(token))

    const { auth } = this.props

    if (auth.data.data.msg) {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')

      this.setNavbar()
      this.props.history.push('/')
    }
  };

  setNavbar = () => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('userId')

    if (token && user) {
      this.setState({
        isLogin: true
      })
    } else {
      this.setState({
        isLogin: false
      })
    }
  }

  cekLoginComponent = (login) => {
    if (!login) {
      return (
        <ul className={`navbar-nav mb-2 mt-4 ms-auto mb-lg-0 ` + css.Auth} >
          <li
            className="nav-item"
          >
            <Link to={{ pathname: "/login" }} className="nav-link">
              <i className="fas fa-user-circle me-2"></i>
              Login
            </Link>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className={`navbar-nav mb-2 mt-4 ms-auto mb-lg-0 ${css.Auth}`} >
          <li className="nav-item">
            <Link to={{ pathname: '/' }} onClick={this.logout} >
              <i className="fas fa-user-circle me-2"></i>
              Logout
            </Link>
          </li>
        </ul>
      )
    }
  }

  componentDidMount = () => {
    this.setNavbar()
  }

  render() {
    return (
      <>
        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <button
              className={`navbar-toggler ${css.NavToggler}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fas fa-bars"></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className={`navbar-nav mb-2 mt-4 mb-lg-0 ${css.MainNav}`}>
                <li className="nav-item">
                  <Link to={{ pathname: "/" }} className="nav-link active">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={{ pathname: "/addrecipe" }} className="nav-link">
                    Add Recipes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={{ pathname: "/profile" }} className="nav-link">
                    Profile
                  </Link>
                </li>
              </ul>
              {this.cekLoginComponent(this.state.isLogin)}
            </div>
          </div>
        </nav>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(withRouter(Navbar));
