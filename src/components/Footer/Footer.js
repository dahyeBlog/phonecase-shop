import React from "react";
import "./footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const year = new Date().getFullYear();

const nav__links = [
  {
    id: 1,
    path: "shop",
    display: "Shop",
  },
  {
    id: 2,
    path: "cart",
    display: "Cart",
  },
  {
    id: 3,
    path: "signup",
    display: "회원가입",
  },
  {
    id: 4,
    path: "login",
    display: "로그인",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col>
            <div className="footer__text">
              <h3 className="text-center">바로가기</h3>
            </div>
            <ul className="d-flex align-items-center justify-content-center ">
              {nav__links.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    className={(footerClass) =>
                      footerClass.isActive ? "footer__active" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>

            <p className="text-center">
              Copyright {year} developed by dahye. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
