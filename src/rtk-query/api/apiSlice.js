import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api'
    }),
    tagTypes: ['Project'],
    endpoints: (build) => ({

        // get all projects
        getProjects: build.query({
            query: () => '/',
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Project', id })), 'Project']
                    : ['Project'],
        }),

        getSingleProject: build.query({
            query: (id) => `/${id}/`,
            providesTags: ['Project']
        }),

        // add
        addProject: build.mutation({
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Project']
        }),

        // update 
        updateProject: build.mutation({
            query: ({ id, data }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Project', id: arg?.id }],
        }),

        // delete 
        deleteProject: build.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Project', id: arg?.id }],
        })

    })
})

export const { useGetProjectsQuery, useGetSingleProjectQuery, useAddProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } = apiSlice