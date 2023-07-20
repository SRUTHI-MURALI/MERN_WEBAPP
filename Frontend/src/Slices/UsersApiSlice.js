import { apiSlice } from "./ApiSlice";
const USERS_URL = '/api/users'

let token= localStorage.getItem('token') ?? '';
console.log(token,'ttttttttttt');

if(token){
    token=JSON.parse(token)
}

export const UsersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/auth`,
                method:'POST',
                body:data
            }),
        }),
        register:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}`,
                method:'POST',
                body:data
            }),
        }),
        updateUser:builder.mutation({
            query:(data)=>({
                url: `${USERS_URL}/profile`,
                method:'PUT',
                body:data,
                headers:{
                    authorization: `Bearer ${token}`
                }
            }),
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST',
            })
        })
    })
})



export const  {useLoginMutation,useLogoutMutation,useRegisterMutation,useUpdateUserMutation}=UsersApiSlice