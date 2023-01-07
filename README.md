# Phone case 쇼핑몰 구현하기

## 데모
- [데모주소][]

## 구현한 기능
- 회원가입, 로그인, 로그아웃
- 


## 구현한 도구
- React, Redux, Firebase V9

## 사용한 라이브러리
- npm i @reduxjs/toolkit
- npm i react-router-dom
- npm install remixicon --save
- npm install react-bootstrap bootstrap
- npm i reactstrap  // bootstrap을 react에서 사용할 수 있도록 패키지로 만든것.
- npm i framer-motion // 리액트 용 애니메이션 라이브러리


## 라이브러리 사이트
 - [reactStrap][https://reactstrap.github.io/?path=/docs/components-layout--layout]
 - [REMIN ICON][https://remixicon.com/]
 - [framer][https://www.framer.com/docs/examples/]

## 이미지 사이트
- https://www.freepik.com/

## 프로젝트 구현을 통해 배운 것

### <NavLink>
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