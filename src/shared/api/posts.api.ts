import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "entities";
import { IPaginatedRequest } from "../../features/virtualScroll/model/index.types";

export const postApi = createApi({
  reducerPath: "post",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    fetchPosts: builder.query<IPost[], IPaginatedRequest>({
      query: ({ limit, start }) => ({
        url: `posts`,
        params: { _limit: limit, _start: start },
      }),
    }),
    fetchPostById: builder.query<IPost, number>({
      query: (id) => ({ url: `posts/${id}` }),
    }),
  }),
});

export const { useFetchPostsQuery, useFetchPostByIdQuery } = postApi;
