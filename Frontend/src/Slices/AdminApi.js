import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const adminslice = createApi({
  baseQuery,
  tagTypes: ['Admin'],
  endpoints: (build) => ({}),
});