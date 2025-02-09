import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://frontend-take-home-service.fetch.com',
  // Add withCredentials to include cookies, session data, or other credentials
  credentials: 'include'
})

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query(credentials: { name: string, email: string }) {
        return { url: 'auth/login', method: 'POST', body: credentials }
      }
    }),
    getBreeds: (builder.mutation({
      query: (url: string) => ({ url, method: 'GET' })
    })),
    getDogs: (builder.mutation({
      query(ids: string[]) {
        return { url: 'dogs', method: 'POST', body: ids }
      }
    })),
    getLocation: (builder.mutation({
      query(zip_codes: string[]) {
        return { url: 'locations', method: 'POST', body: zip_codes }
      }
    })),
    getMatch: (builder.mutation({
      query(dogIDs: string[]) {
        return { url: 'dogs/match', method: 'POST', body: dogIDs }
      }
    })),
    logout: (builder.mutation({
      query(args) {
        return { url: 'auth/logout', method: 'POST', body: args }
      }
    }))
  })
})

export const { 
  useLoginMutation, 
  useGetBreedsMutation, 
  useGetDogsMutation, 
  useGetLocationMutation, 
  useGetMatchMutation,
  useLogoutMutation
} = apiSlice;