import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { firestoreDb } from "../firebase";
import "../styles/signup.css";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });


  // data의 값을 따로 가져옴
  const { name, email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // 회원가입 submit 설정
  const handleSubmit = async (e) => {
    e.preventDefault()

    // 정보를 보내면, 다음과 같이 loading안의 값이 true로 바뀐다. 
    setData({...data, error: null, loading: true })

    // input 안의 내용이 없다면, 다음과 같이 오류를 구현하도록 한다. 
    if(!name || !email || !password) {
      setData({...data, error: alert('회원가입에 필요한 정보를 입력하세요 😊')})
    }

    // 암호 기반 계정 회원가입하기
    try {
      const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        // form 안에 있는 정보 문서 저장
        await setDoc(doc(firestoreDb, "users", result.user.uid), {
          uid: result.user.uid,
          name,
          email,
          createdAt: Timestamp.fromDate(new Date()),
          isLogged: true
        })

        setData({
          name:"",
          email: "",
          password:"",
          error:null,
          loading: false,
        })

        navigate('/home')

      } catch (error) {
      setData({ ...data, error: error.message, loading: false });
    }

  }


  return (
    <section className="signup__section">
      <Container>
        <Row>
          <Col lg="12">
            <h3>회원가입</h3>
            <form className="signupForm" onSubmit={handleSubmit}>
              <div className="signupForm__list">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={name}
                />
              </div>

              <div className="signupForm__list">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={email}
                />
              </div>

              <div className="signupForm__list">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={password}
                />
              </div>

              {error ? <p className="error">{error}</p> : null}
              <div className="btnContainer">
                <button className="buy__btn" disabled={loading}>
                  {loading ? "가입중...⏳" : "회원가입"}
                </button>
              </div>

            </form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Signup;
