import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
   
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      let token= action.payload ?.token;
     
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('userToken', JSON.stringify(token));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userToken');
    },
  },
});


export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;