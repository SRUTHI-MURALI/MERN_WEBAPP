import { adminslice } from "./AdminApi";
const ADMIN_URL = '/api/admin';

console.log('fffff');

export const AdminApiSlice = adminslice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminlogin`, 
        method: 'POST',
        body: data
      }),
    }),
  })
});


export const { useLoginMutation } = AdminApiSlice;