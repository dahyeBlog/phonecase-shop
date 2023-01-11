# Phone case 쇼핑몰 구현하기

## 데모
- [데모주소][https://phonecase-shop.vercel.app/home]

## 구현한 기능
- 회원가입, 로그인, 로그아웃
- 상품 장바구니 상품 추가, 삭제, 주문
- 찾고자하는 상품 검색 및 필터
- 상품 게시판에 댓글 달기



## 구현한 도구
- React, Redux, Firebase V9

## 사용한 라이브러리
- npm i @reduxjs/toolkit
- npm i react-redux
- npm i react-router-dom
- npm install remixicon --save
- npm install react-bootstrap bootstrap
- npm i reactstrap  // bootstrap을 react에서 사용할 수 있도록 패키지로 만든것.
- npm i framer-motion // 리액트 용 애니메이션 라이브러리
- npm i react-toastify // 알림 라이브러리
- npm install firebase //firebase 설치
- npm install dotenv

## 라이브러리 사이트
 - [reactStrap][https://reactstrap.github.io/?path=/docs/components-layout--layout]
 - [REMIN ICON][https://remixicon.com/]
 - [framer][https://www.framer.com/docs/examples/]
- [React-Toastify][https://fkhadra.github.io/react-toastify/autoClose]

## 이미지 사이트
- https://www.freepik.com/

## 프로젝트 구현을 통해 배운 것

### NavLink
- React-Router에서 지원하는 기능
- 기존의 <Link> 와 다른점은 클릭 시 다른 페이지로 이동시킬 뿐만 아니라, isActive속성을 전달받아 현재 active된 요소를 선택하여 style 지정이나, className지정을 할 수 있다.

 ```
nav__links.map(item => (
 <li key={item.id} className="nav__item">
    <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav__active' : ''} >{item.display}
    </NavLink>
 </li>
  ```

### framer-motion 으로 이미지에 효과 주기
```
// 이미지 클릭시 scale:1.2 크기만큼 커졌다 사라짐
 <motion.img whileTap={{scale:1.2}} src={user} alt="user" />

```

### react - helmet
- React 에서 웹사이트 타이틀(탭 이름)을 동적으로 변경할 수 있게 해준다. 
- npm i react-helmet-async 를 사용하는 방법도 있다.
```
// 컴포넌트를 다음과 같이 만든다. 

const Helmet = (props) => {
  document.title = 'PhoneCaseShop - ' + props.title
  return (
    <div className='w-100'>{props.children}</div>
  )
}

export default Helmet
```
```
// 사용하고자 하는 페이지에 다음과 같이 import 하고 내용을 적용한다. 
import Helmet from '../components/Helmet/Helmet'

const Home = () => {
  return (
    <Helmet title={'Home'}></Helmet>
  )
```

### Header의 메뉴바 고정하기 

```
  const headerRef = useRef(null) // 고정하기 원하는 참조값지정

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }

  useEffect(() => {
    stickyHeaderFunc()

    return () => window.removeEventListener("scroll", stickyHeaderFunc)
  }, [])
```

### select 요소에 option filter 기능 넣기
```

// state로 products라는 데이터를 받아온다.

  const [productsData, setProductsData] = useState(products)
  
  const handlerFilter = (e) => {
    const filterValue = e.target.value; // 선택한 e값의 value를 filterValue에 할당한다. 
    if(filterValue === 'iPhone') { // 선택한 filterValue 값이 'iPhone' 과 일치하다면,
      const filteredProducts = products.filter((item) => item.category === 'iPhone') // filteredProducts의 변수 안에 import 해온 products의 데이터에 filter 함수로 'iPhone' 과 일치하는 category의 값을 filteredProducts의 변수에 할당한다. 
      setProductsData(filteredProducts)
    }
  }
  console.log(productsData);


// return 아래의 select앨리먼트에 handlerFilter라 지정한 함수를 입력한다.
<select onChange={handlerFilter}>
 <option>카테코리 필터</option>

```

### useParams()
- 리액트 라우터 라이브러리에서 제공하는 함수, React 16.8 버전 이상에서만 구동이 가능하다. 파라미터 값을 URL을 통해서 넘겨겨 받은 페이지에서 사용할 수 있도록 도와준다.
- 예를 들어 여러개의 쇼핑제품의 정보가 담겨 있는 데이터를 출력하고, 그 제품 상세페이지로 들어가도록 구현한다면, 쇼핑제품의 id 값을 URL로 넘겨 세부페이지에 id값에 해당하는 영화정보만 출력하도록 만들 수 있도록 한다. 


### 총 금액을 원단위로 변환
```
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
```

### ProtectedRoute파일을 만들어 계정이 없다면 login 페이지로 이동시키기
```
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to='login' />;
};

export default ProtectedRoute;


```
### 발생한 오류
- 회원가입 시 프로필 사진을 등록 한 후 다음과 같은 오류가 발생했다. 
- 계속 방법을 찾아보다 아래와 같은 코드로 변경 후 오류가 사라졌다. 
```
// 오류
Uncaught (in promise) FirebaseError: Firebase Storage: Object 'images/Wed Jan 11 2023 17:20:15 GMT+0900 (한국 표준시)test' does not exist. (storage/object-not-found)

```

```
  // 회원가입 및 프로필 사진 업로드 코드 (변경 후) 
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
        
      const storageRef = ref(storage, `images/${new Date() + username}`);
      
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // update profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL
            })

            // create user on firestore
            await setDoc(doc(firestoreDb, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            })

            setLoading(false);
            toast.success("회원가입이 완료되었습니다.");
            navigate("/", { replace: true });
          } catch (error) {
            setLoading(false);
            toast.error("에러가 발생했습니다.");
          }
        })
      })

    } catch (error) {
      setLoading(false);
      toast.error("에러가 발생했습니다.");
    }
  };

```

```
  //오류가 발생한 코드 (변경 전)
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
      const storageRef = ref(storage, `images/${new Date() + username}`);


      const uploadTask = uploadBytesResumable(storageRef, file);

       uploadTask.on(
         (error) => {
          toast.error(error.message);
         },
         () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
           
            // 사용자 프로필파일 업데이트
            await updateProfile(user, {
               displayName: username,
               photoURL: downloadURL,
            });

            // firestore에 사용자 정보 저장하기

             await setDoc(doc(firestoreDb, "users", user.uid), {
              uid: user.uid,
               displayName: username,
              email,
              photoURL: downloadURL,
             });
          });
         }
       );
       setLoading(false);
      toast.success("회원가입이 완료되었습니다.");

       navigate("/", { replace: true });

```