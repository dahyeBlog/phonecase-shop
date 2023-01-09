import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import { firestoreDb } from "../../firebase";
import "./reviews.css";

const Reviews = ({ reviewList, id }) => {
  const [newReview, setNewReview] = useState("");
  const [editing, setEditing] = useState(false);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setNewReview(e.target.value);
  };

  // 저장한 리뷰 수정하기
  const updateReviewHandler = async (review, newReview) => {
    setEditing((prev) => !prev);
    await updateDoc(doc(firestoreDb, id, review.id), {
      review: newReview,
    });
    setNewReview(review.review);
  };

  // 리뷰 삭제하기
  const handleDelete = async (reviewsId) => {
    await deleteDoc(doc(firestoreDb, id, reviewsId));
  };

  return (
    <div className="review__container">
      <div className="review__list">
        <h4>아이디 : {reviewList.email} </h4>
        <h4>리뷰 : {reviewList.review} </h4>
        {user.uid === reviewList.creatorId ? (
          <>
            <button
              className="buy__btn"
              onClick={() => updateReviewHandler(reviewList, newReview)}
            >
              <i className="ri-edit-line"></i>
            </button>

            <button
              className="buy__btn"
              onClick={() => handleDelete(reviewList.id)}
            >
              <i className="ri-delete-bin-fill"></i>
            </button>
          </>
        ) : (
          ""
        )}
      </div>
      <input
        type="text"
        value={newReview}
        className={editing ? "showInput" : "noShowInput"}
        onChange={handleChange}
      />
    </div>
  );
};

export default Reviews;
