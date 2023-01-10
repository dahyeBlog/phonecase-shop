import { async } from "@firebase/util";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { auth, firestoreDb, storage } from "../firebase";
import userImg from "../assets/images/user.png";
import "../styles/profile.css";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // 저장한 사용자 유저의 데이터 가져오기
    getDoc(doc(firestoreDb, "users", auth.currentUser.uid)).then((doSnap) => {
      if (doSnap.exists) {
        setUser(doSnap.data());
      }
    });

    // 프로필 사진 저장하기
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );

        try {
          // 적절한 참조를 만든 다음 uploadBytes() 메서드를 호출한다.
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateProfile(auth.currentUser, {
            photoURL: url,
          });

          // 이미지 업로드 시 Firestore 데이터 업데이트
          await updateDoc(doc(firestoreDb, "users", auth?.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });

          alert("프로필 사진이 변경되었습니다. 😎");
          setImg("");
          window.location.reload();
        } catch (error) {
          alert(error.message);
        }
      };
      uploadImg();
    }
  }, [img]);

  // 프로필 사진 삭제하고 Firestorage 업데이트

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("삭제를 원하세요?");
      if (confirm) {
        await deleteObject(ref(storage, user?.avatarPath));
        await updateDoc(doc(firestoreDb, "users", auth.currentUser.uid), {
          avatar: "",
          avatarPath: "",
        });

        await updateProfile(auth.currentUser, {
          photoURL: ""
        })

        alert("프로필 사진이 변경되었습니다. 👏");
        navigate("/home");
        window.location.reload();

      }
    } catch (error) {
      alert(error.message);
    }
  };

  return user ? (
    <section className="profile__section">
      <Container>
        <Row>
          <Col lg="12">
            <div className="profile__img">
              <img src={user?.avatar || userImg} alt="img" />
              <div className="overlay">
                <div>
                  <label htmlFor="photo">
                    <i className="ri-image-fill"></i>
                  </label>
                  {user.avatar ? <i onClick={deleteImage} className="ri-delete-bin-line"></i> : null}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="photo"
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </div>
              </div>
            </div>

            <div className="text_container">
              <p>{user?.email}</p>
              <hr />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  ) : null;
};

export default Profile;
