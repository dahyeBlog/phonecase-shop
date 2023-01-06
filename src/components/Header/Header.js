import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import user from "../../assets/images/user.png";
import { Container, Row } from "reactstrap"


const Header = () => {
  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>PhoneCase Shop</h1>
                <p>Welcome📱</p>
              </div>
            </div>

            <div className="navigation">
              <ul className="menu">
                <li className="nav__item">
                  <NavLink to="home">Home</NavLink>
                </li>
                <li className="nav__item">
                  <NavLink to="home">Shop</NavLink>
                </li>
                <li className="nav__item">
                  <NavLink to="home">Cart</NavLink>
                </li>
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
              </span>
              <span className="cart__icons">
                <i className="ri-shopping-bag-line"></i>
              </span>

              <span>
                <img src={user} alt="user" />
              </span>
            </div>

            <div className="mobile__menu">
              <span>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
