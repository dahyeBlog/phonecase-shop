import React from "react";
import { Container, Row, Col, Form, FormGroup } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../UI/CommonSection";
import "../styles/checkout.css";
import { useSelector } from "react-redux";

const Checkout = () => {
  const totalQty = useSelector(state => state.cart.totalQuantity)
  const totalAmount = useSelector(state => state.cart.totalAmount)

    // 총 금액을 원단위로 변환
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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
                  <input type="text" placeholder="이름을 작성하세요." />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="email" placeholder="이메일을 작성하세요." />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="tel" placeholder="핸드폰 번호를 작성하세요." />
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="주소를 작성하세요." />
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
              <button className="buy__btn auth__btn w-100">주문하기</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
