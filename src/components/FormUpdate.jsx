import React from 'react'
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUpdateProjectMutation } from '../rtk-query/api/apiSlice';


const FormUpdate = ({ singleProject }) => {

    console.log('singleProject', singleProject);

    const navigate = useNavigate();


    const {
        id,
        title: initialTitle,
        thumbnail: initialThumbnail,
        category: initialCategory,
        description: initialDescription,
        demo: initialDemo

    } = singleProject;

    const [thumbnail, setThumbnail] = useState(initialThumbnail);
    const [title, setTitle] = useState(initialTitle);
    const [category, setCategory] = useState(initialCategory);
    const [description, setDescription] = useState(initialDescription);
    const [demo, setDemo] = useState(initialDemo);



    const [updateProject, { isLoading, isError, error }] = useUpdateProjectMutation() || {};

    const projectUpdateSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('thumbnail', thumbnail)
        formData.append('title', title)
        formData.append('category', category)
        formData.append('description', description)
        formData.append('demo', demo)

        updateProject({ id: id, data: formData });

        navigate("/");

    }




    return (
        <Form onSubmit={projectUpdateSubmitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>

            <Form.Select aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option defaultValue value={category}>{category}</option>
                <option>--- choose Other categories ----</option>
                <option value="web development">Web Development</option>
                <option value="frontend engineer">Frontend Engineer</option>
                <option value="backend engineer">Backend Engineer</option>
            </Form.Select>

            <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" value={demo} onChange={(e) => setDemo(e.target.value)} placeholder="Enter Demo Link" />
            </Form.Group>


            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Update Thumbnail</Form.Label>
                <Form.Control type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
                <img className='mt-2 mb-2 pd-4' src={thumbnail} height='100px' width='150px' />
            </Form.Group>

            <Button variant='success' type='submit'>
                Update Project
            </Button>



            {isError && !isLoading && <span>{error}</span>}

        </Form>
    )
}

export default FormUpdate