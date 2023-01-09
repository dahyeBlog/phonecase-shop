import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { auth, firestoreDb } from "../firebase";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // 이메일과 비밀번호 로그인 하기
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });

    if (!email || !password ) {
      setData({
        ...data,
        error: "이메일 및 비밀번호를 입력하세요."
      });
    }

    try {
      // 로그인 메서드로 로그인 구현
      const result = await signInWithEmailAndPassword(auth, email, password);

      // 로그인 성공 시 데이터 수정
      await updateDoc(doc(firestoreDb, "users", result.user.uid), {
        isLogged: true,
      });

      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });

      navigate("/home");
    } catch (error) {
      setData({ ...data, error: error.message, loading: false });
    }
  };


  // 구글로 로그인하기
  const authGoogleHandler = async (e) => {
    const {target: {name}} = e

    let provider;
    if(name === 'google') {
      provider = new GoogleAuthProvider()
    }
    
    // 구글로 로그인 시 팝업창 생성
    const data = await signInWithPopup(auth, provider)
    navigate('/home')
    alert('로그인이 되었습니다.')
  }

  return (
    <section className="login__section">
      <Container>
        <Row>
          <Col>
            <h3>로그인</h3>
            <form className="loginForm" onSubmit={handleSubmit}>
              <div className="loginForm__list">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>

              <div className="loginForm__list">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="btnContainer">
                {/* disabled값을 지정하면, 특정 조건이 충족될때 까지 데이터가 제출 되지 않음 */}
                <button className="buy__btn" disabled={loading}>
                  {loading ? "로그인중..." : "로그인"}
                </button>

                <button
                  className="buy__btn"
                  name="google"
                  onClick={authGoogleHandler}
                >
                  구글로 로그인
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
