import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/user.png";

const nav__links = [
  {
    id:1,
    path: 'home',
    display: 'Home'
  },
  {
    id:2,
    path: 'shop',
    display: 'Shop'
  },
  {
    id:3,
    path: 'cart',
    display: 'Cart'
  },
]


const Header = () => {
  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <Link to='/home'>
              <img src={logo} alt="logo" />
              </Link>

            </div>

            <div className="navigation">
              <ul className="menu">
                {
                  nav__links.map(item => (
                    <li key={item.id} className="nav__item">
                      <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav__active' : ''} >{item.display}</NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <i className="ri-heart-line"></i>
                {/* 장바구니에 아이템 클릭시에 숫자 증가 */}
                <span className="badge">1</span>
              </span>
              <span className="cart__icon">
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">1</span>
              </span>

              <div className="profile">
                <motion.img whileTap={{scale:1.2}} src={user} alt="user" />
              </div>
            </div>

            <div className="mobile__menu">
              <span><i className="ri-menu-line"></i></span>
            </div>


          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
