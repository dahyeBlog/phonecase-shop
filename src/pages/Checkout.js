import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../UI/CommonSection";
import "../styles/checkout.css";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const { name, email, phone, address } = input;
  // 총 금액을 원단위로 변환
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInput({
      ...input, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="주문서" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold text-center">주문서 정보</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="name"
                    onChange={onChange}
                    placeholder="이름을 작성하세요."
                    value={name}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    name="email"
                    onChange={onChange}
                    placeholder="이메일을 작성하세요."
                    value={email}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="tel"
                    name="phone"
                    onChange={onChange}
                    placeholder="핸드폰 번호를 작성하세요."
                    value={phone}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="address"
                    onChange={onChange}
                    placeholder="주소를 작성하세요."
                    value={address}
                  />
                </FormGroup>
              </Form>
            </Col>

            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  총 수량: <span>{totalQty} 개</span>
                </h6>
                <h4>
                  총 비용: <span>{numberWithCommas(totalAmount)} 원</span>
                </h4>
                <button type="submit" className="buy__btn auth__btn w-100">
                  주문하기
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
