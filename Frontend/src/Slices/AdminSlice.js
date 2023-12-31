import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  adminInfo: localStorage.getItem('adminInfo')
    ? JSON.parse(localStorage.getItem('adminInfo'))
    : null,
};

const adminSlice = createSlice({
  
  name: 'admin',
  initialState,
  reducers: {
    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload;
      let token = action.payload?.token;

      localStorage.setItem('token', JSON.stringify(token));
      
    },
    adminLogout: (state, action) => {
      state.adminInfo = null;
      localStorage.removeItem('adminInfo');
      
    },
    
  },
});

export const { setAdminCredentials, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
