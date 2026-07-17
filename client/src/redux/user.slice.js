import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    city: null,
    state: null,
    currentAddress: null,
    shopInMyCity: null,
    itemsInMyCity: null,
    searchItems: null,
    loading: true,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setShopInMyCity: (state, action) => {
      state.shopInMyCity = action.payload;
    },
    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },
    setSearchItems: (state, action) => {
      state.searchItems = action.payload;
    },
  },
});

export default userSlice.reducer;
export const {
  setUserData,
  setCity,
  setState,
  setLoading,
  setCurrentAddress,
  setShopInMyCity,
  setItemsInMyCity,
  setSearchItems,
} = userSlice.actions;
