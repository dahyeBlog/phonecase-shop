import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../UI/CommonSection";
import products from "../assets/data/products";
import { useParams } from "react-router-dom";
import { cartActions } from "../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "../styles/product-detail.css";
import Reviews from "../components/Reviews/Reviews";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, firestoreDb } from "../firebase";
import { AuthContext } from "../context/auth";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  const { id } = useParams(); //usePrams로 id를 넘겨 받는다.
  const product = products.find((item) => item.id === id); // 클릭한 제품의 정보를 찾아 product에 할당함.

  const { imgUrl, productName, category, price, description } = product;

  // 제품 카트에 담기
  const addToCart = async () => {
    dispatch(
      cartActions.addItem({
        id: product.id,
        productName: product.productName,
        price: product.price,
        image: product.imgUrl,
      })
    );

    toast.success("상품이 장바구니에 담겼습니다.");
  };

  // 리뷰를 Firebase에 저장하기
  const createReviewHandler = async (e) => {
    e.preventDefault();
    if (reviewText === "") {
      alert("리뷰를 작성해주세요.");
      return;
    }
    await addDoc(collection(firestoreDb, id), {
      email: user.email,
      review: reviewText,
      createdAt: new Date(),
      creatorId: user.uid,
    });
    setReviewText("");
  };

  // Firebase에 저장된 리뷰를 가져오기
  useEffect(() => {
    const q = query(collection(firestoreDb, id), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let reviewsArr = [];
      querySnapshot.forEach((doc) => {
        reviewsArr.push({ ...doc.data(), id: doc.id });
      });
      setReviews(reviewsArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Helmet title={`Product - ${id}`}>
      <CommonSection title={`${productName} 상세페이지`} />

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__price">
                  <p>가격 : {price}원</p>
                </div>
                <div className="product__category">
                  <p>카테고리 : {category}</p>
                </div>
                <div className="product__desc">
                  <p>{description}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  장바구니에 담기
                </motion.button>
              </div>
              <ToastContainer autoClose={2000} />
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="review__wrapper text-center">
                <h4>리뷰 남기기</h4>

                {user ? (
                  <form className="review__form" onSubmit={createReviewHandler}>
                    <div className="review_form__group">
                      <p>{user.email}</p>
                      <textarea
                        type="text"
                        rows={4}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="리뷰를 작성하세요."
                      />
                    </div>
                    <motion.button
                      whileTap={{ scale: 1.2 }}
                      className="buy__btn"
                      type="submit"
                    >
                      리뷰 남기기
                    </motion.button>
                  </form>
                ) : (
                  <>
                    <p>로그인 후 리뷰를 남겨주세요.</p>
                  </>
                )}
                <div className="review__comments">
                  <p> 현재 리뷰 수 ({reviews.length})</p>

                  <>
                    {reviews.map((reviewList, index) => (
                      <Reviews reviewList={reviewList} key={index} id={id} />
                    ))}
                  </>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
