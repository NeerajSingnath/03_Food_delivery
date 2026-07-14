import { createSlice } from '@reduxjs/toolkit';

const ownerSlice = createSlice({
  name: 'owner',
  initialState: {
    myShopData: null,
    loading: true,
  },
  reducers: {
    setMyShopData: (state, action) => {
      state.myShopData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default ownerSlice.reducer;
export const { setMyShopData, setLoading } = ownerSlice.actions;
