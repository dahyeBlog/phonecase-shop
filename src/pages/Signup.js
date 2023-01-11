import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Col, Container, Row, Form, FormGroup } from "reactstrap";
import {
  ref,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, firestoreDb } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { storage } from "../firebase";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import "../styles/login.css";
import Helmet from "../components/Helmet/Helmet";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();

  // firebase 이용해서 회원가입하기
  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const storageRef = ref(
        storage,
        `images/${new Date().getTime()} - ${file.name}`
      );

      uploadBytes(storageRef, file)
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              setUrl(url);

              updateProfile(user, {
                displayName: username,
                photoURL: url,
              });

              setDoc(doc(firestoreDb, "users", user.uid), {
                uid: user.uid,
                displayName: username,
                email,
                photoURL: url,
              });
            
              toast.success("회원가입이 완료되었습니다.👏");
              setLoading(false);
              navigate("/login");
            })
          setFile(null);
        })

    } catch (error) {
      toast.error("오류가 발생했습니다.😭");
      setLoading(false);
    }
  };

  return (
    <Helmet title="Signup">
      <section className="sign__section">
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center ">
                <h6 className="fw-bold">Loading...</h6>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Sign Up</h3>

                <Form className="auth__form" onSubmit={signupHandler}>
                  <FormGroup className="form__group">
                    <label htmlFor="name"> 사용자 이름 </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="이름을 입력하세요."
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <label htmlFor="email"> 이메일 </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="이메일을 입력하세요."
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <label htmlFor="email"> 비밀번호 </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="비밀번호를 입력하세요."
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <label htmlFor="email"> 프로필사진 </label>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </FormGroup>

                  <button type="submit" className="buy__btn auth__btn">
                    Sign up
                  </button>
                  <p>
                    이미 계정이 있으세요?{" "}
                    <Link to="/login"> 로그인 하러가기</Link>
                  </p>
                </Form>
                <ToastContainer />
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
