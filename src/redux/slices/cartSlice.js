import { createSlice } from "@reduxjs/toolkit";

// 초기값 설정
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload; //payload로 받아온 값 newItem에 할당하기
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      // existingItem 변수에 state 안에 있는 cartItems에 같은 item의 id가 있는지 찾아 할당하기
      state.totalQuantity++;

      if (!existingItem) {
        // 만약 existingItem이 존재하지 않는다면 다음과 같이 상태값 cartItems 안에 값을 push 해야함.
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        // 반대로 existingItem의 값에 같은 item의 id가 있다면, existingItem 안의 quantity의 숫자를 증가
        existingItem.quantity++;
        // existingItem의 totalPrice의 값에 기존 totalPrice의 값 + 추가할 price의 값을 더한다.
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      // 현재 state의 총 가격의 값은 carItems의 item의 가격과 item의 양을 곱한 값을 나타내는데, reduce함수를 통해 누적된 값을 같이 더해준다.
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity)
      ,0);
    },

    // 카트에 담기 상품 삭제하기
    deleteItem: (state, action) => {
      const id = action.payload;
      const exisitingItem = state.cartItems.find((item) => item.id === id);

      if (exisitingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - exisitingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
