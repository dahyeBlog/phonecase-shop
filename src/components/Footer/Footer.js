import React, { useContext } from "react";
import "./footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, firestoreDb } from "../../firebase";
import { signOut } from "firebase/auth";

const year = new Date().getFullYear();

const Footer = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 로그아웃 기능
  const handleSignout = async () => {
    // 문서의 일부 필드를 업데이트
    await updateDoc(doc(firestoreDb, "users", auth.currentUser.uid), {
      isLogged: false,
    });
    await signOut(auth);
    navigate("/login");
  };

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col>
            <div className="footer__text">
              <h3 className="text-center">바로가기</h3>
            </div>
            <ul className="d-flex align-items-center justify-content-center ">
              {user ? (
                <>
                  <li>
                    <Link to="/login" onClick={handleSignout}>
                      로그아웃
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signup">회원가입</Link>
                  </li>
                  <li>
                    <Link to="/login">로그인</Link>
                  </li>
                </>
              )}
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
