import React, { useRef, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/logo.png";
import userImg from "../../assets/images/user.png";
import { useSelector } from "react-redux";
import { AuthContext } from "../../context/auth";
import { auth } from "../../firebase";

const nav__links = [
  {
    id: 1,
    path: "home",
    display: "Home",
  },
  {
    id: 2,
    path: "shop",
    display: "Shop",
  },
  {
    id: 3,
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user } = useContext(AuthContext);

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };
  
  useEffect(() => {
    stickyHeaderFunc();

    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <Link to="/home">
                <img src={logo} alt="logo" />
              </Link>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item) => (
                  <li key={item.id} className="nav__item">
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="cart__icon">
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="profile">
                {user ? (
                  <Link to="/profile">
                    <motion.img
                      whileTap={{ scale: 1.2 }}
                      src={user.photoURL || userImg}
                      alt="user"
                    />
                  </Link>
                ) : (
                  ""
                )}
              </div>

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
