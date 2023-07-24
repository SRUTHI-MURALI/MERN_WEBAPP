import { adminslice } from "./AdminApi";
const ADMIN_URL = '/api/admin';



export const AdminApiSlice = adminslice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/adminlogin`, 
        method: 'POST',
        body: data
      }),
    }),
    getUser: build.mutation({
      query: () => ({
        url: `${ADMIN_URL}/userData`, 
        method: 'GET',
      
      }),
    }),
    adminlogout:build.mutation({
      query:()=>({
          url:`${ADMIN_URL}/adminlogout`,
          method:'POST',
      })
  })
  })
});


export const { useLoginMutation,useAdminlogoutMutation,useGetUserMutation } = AdminApiSlice;