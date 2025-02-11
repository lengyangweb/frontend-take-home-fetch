import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://frontend-take-home-service.fetch.com',
  credentials: 'include' // Add withCredentials to include cookies, session data, or other credentials
})

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { name: string, email: string }) => ({ url: 'auth/login', method: 'POST', body })
    }),
    getBreeds: (builder.mutation({
      query: (url: string) => ({ url, method: 'GET' })
    })),
    getDogs: (builder.mutation({
      query: (ids: string[]) => ({ url:'dogs', method: 'POST', body: ids })
    })),
    getLocation: (builder.mutation({
      query: (body: string[]) => ({ url: 'locations', method: 'POST', body })
    })),
    getMatch: (builder.mutation({
      query: (dogIDs: string[]) => ({ url: 'dogs/match', method: 'POST', body: dogIDs })
    })),
    logout: (builder.mutation({
      query: (body) => ({ url: 'auth/logout', method: 'POST', body })
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