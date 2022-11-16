import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetSingleProjectQuery } from '../rtk-query/api/apiSlice';
import FormUpdate from './FormUpdate';


const UpdateProject = () => {

  const { id } = useParams();

  const { data: singleProject } = useGetSingleProjectQuery(id) || {};

  return (
    <div className='container mt-4 mb-4 pd-3'>
      <h1>Update Project id:{id}</h1>
      <hr />
      <div>

        {singleProject && <FormUpdate singleProject={singleProject} />}



      </div>
    </div>
  )
}

export default UpdateProject