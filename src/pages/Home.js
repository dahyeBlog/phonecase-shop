import React, { useState, useEffect } from "react";
import "../styles/home.css";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Carousel } from "react-bootstrap";
import homeImg from "../assets/images/homeImg.png";
import homeImg2 from "../assets/images/homeImg2.png";
import homeImg3 from "../assets/images/homeImg3.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductsList from "../UI/ProductsList";

const homeImgs = [
  {
    id: 1,
    imgUrl: homeImg,
  },
  {
    id: 2,
    imgUrl: homeImg2,
  },
  {
    id: 3,
    imgUrl: homeImg3,
  },
];

const Home = () => {
  const [data, setData] = useState(products);
  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredProducts = products.filter(
      (item) => item.category === "iphone 14 Pro"
    );

    setData(filteredProducts);
  }, []);

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col>
              <Carousel>
                {homeImgs.map((item) => (
                  <Carousel.Item key={item.id}>
                    <div className="home__img">
                      <img src={item.imgUrl} alt="" />
                    </div>

                    <Carousel.Caption>
                      <div className="hero__content">
                        <p>가장 트렌디한 상품들을 만나보세요.</p>
                        <h2>
                          {year}년 에는 더 다양한 제품들을 선보이겠습니다.
                        </h2>
                        <p>
                          “ I wish you a happy life. Let's make better days
                          together! ”
                        </p>
                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          className="buy__btn"
                        >
                          <Link to="/shop">더 많은 제품보러가기</Link>
                        </motion.button>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="popular__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">인기 제품들</h2>
            </Col>
            <ProductsList data={data} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
