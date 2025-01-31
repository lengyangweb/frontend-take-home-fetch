import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://frontend-take-home-service.fetch.com' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query(credentials: { name: string, email: string }) {
        return { url: 'auth/login', method: 'POST', body: credentials }
      }
    })
  })
})

export const { useLoginMutation } = apiSlice;