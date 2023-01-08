import React, { useState } from "react";
import CommonSection from "../UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/shop.css";

import products from "../assets/data/products";
import ProductsList from "../UI/ProductsList";

const Shop = () => {
  const [productsData, setProductsData] = useState(products);

  const handlerFilter = (e) => {
    const filterValue = e.target.value; // 선택한 e값의 value를 filterValue에 할당한다.
    if (filterValue === "iPhone") {
      // 선택한 filterValue 값이 'iPhone' 과 일치하다면,
      const filteredProducts = products.filter(
        (item) => item.category === "iPhone"
      ); // filteredProducts의 변수 안에 import 해온 products의 데이터에 filter 함수로 'iPhone' 과 일치하는 category의 값을 filteredProducts의 변수에 할당한다.
      setProductsData(filteredProducts);
    }

    if (filterValue === "Samsung") {
      const filteredProducts = products.filter(
        (item) => item.category === "Samsung"
      ); 
      setProductsData(filteredProducts);
    }
    
  };

  return (
    <Helmet title={"Shop"}>
      <CommonSection title="Products" />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="filter__widget">
                <select onChange={handlerFilter}>
                  <option>카테코리 필터</option>
                  <option value="iPhone">iPhone</option>
                  <option value="Samsung">Samsung</option>
                </select>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="search__box">
                <input type="text" placeholder="검색어를 입력하세요." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1>결과값을 찾을 수 없습니다.😅 </h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
