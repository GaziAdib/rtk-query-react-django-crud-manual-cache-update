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
            // providesTags: (result, error, arg) =>
            //     result
            //         ? [...result.map(({ id }) => ({ type: 'Project', id })), 'Project']
            //         : ['Project'],
        }),

        getSingleProject: build.query({
            query: (id) => `/${id}/`,
            // providesTags: ['Project']
        }),

        // add
        addProject: build.mutation({
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data
            }),

            async onQueryStarted(args, { queryFulfilled, dispatch }) {

                try {

                    const { data: createdProject } = await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData('getProjects', undefined, (draft) => {
                            draft?.push(createdProject)
                        })
                    )

                } catch (error) {
                    console.log(error)
                }

            }

        }),

        // update 
        updateProject: build.mutation({
            query: ({ id, data }) => ({
                url: `/${id}/`,
                method: 'PUT',
                body: data
            }),
            // invalidatesTags: ['Project']

            async onQueryStarted(args, { queryFulfilled, dispatch }) {

                try {

                    const { data: updatedProject } = await queryFulfilled;


                    dispatch(
                        apiSlice.util.updateQueryData('getProjects', undefined, (draft) => {

                            let project = draft?.find((item) => item?.id === args?.id);

                            project.thumbnail = updatedProject?.thumbnail;
                            project.title = updatedProject?.title;
                            project.category = updatedProject?.category;
                            project.description = updatedProject?.description;
                            project.demo = updatedProject?.demo;

                        })
                    )


                    dispatch(
                        apiSlice.util.updateQueryData('getSingleProject', args.id, (draft) => {

                            let project = draft;

                            Object.assign(project, {
                                id: updatedProject?.id,
                                thumbnail: updatedProject?.thumbnail,
                                title: updatedProject?.title,
                                category: updatedProject?.category,
                                description: updatedProject?.description,
                                demo: updatedProject?.demo

                            })


                            // project.thumbnail = updatedProject?.thumbnail;
                            // project.title = updatedProject?.title;
                            // project.category = updatedProject?.category;
                            // project.description = updatedProject?.description;
                            // project.demo = updatedProject?.demo;

                        })
                    )

                } catch (error) {
                    console.log(error)
                }

            }
        }),




        // delete 
        deleteProject: build.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {

                try {

                    await queryFulfilled;

                    dispatch(
                        apiSlice.util.updateQueryData('getProjects', undefined, (draft) => {
                            // delete
                            return draft?.filter((project) => project?.id !== args);
                        })
                    )

                } catch (error) {
                    console.log(error)
                }

            }

        })

    })
})

export const { useGetProjectsQuery, useGetSingleProjectQuery, useAddProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } = apiSlice




















// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const apiSlice = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'http://127.0.0.1:8000/api'
//     }),
//     tagTypes: ['Project'],
//     endpoints: (build) => ({

//         // get all projects
//         getProjects: build.query({
//             query: () => '/',
//             providesTags: (result, error, arg) =>
//                 result
//                     ? [...result.map(({ id }) => ({ type: 'Project', id })), 'Project']
//                     : ['Project'],
//         }),

//         getSingleProject: build.query({
//             query: (id) => `/${id}/`,
//             providesTags: ['Project']
//         }),

//         // add
//         addProject: build.mutation({
//             query: (data) => ({
//                 url: '/',
//                 method: 'POST',
//                 body: data
//             }),
//             invalidatesTags: ['Project']
//         }),

//         // update
//         updateProject: build.mutation({
//             query: ({ id, data }) => ({
//                 url: `/${id}`,
//                 method: 'PUT',
//                 body: data
//             }),
//             invalidatesTags: (result, error, arg) => [{ type: 'Project', id: arg?.id }],
//         }),

//         // delete
//         deleteProject: build.mutation({
//             query: (id) => ({
//                 url: `/${id}`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: (result, error, arg) => [{ type: 'Project', id: arg?.id }],
//         })

//     })
// })

// export const { useGetProjectsQuery, useGetSingleProjectQuery, useAddProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } = apiSlice