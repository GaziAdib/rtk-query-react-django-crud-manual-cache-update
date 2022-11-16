// get all projects data from api

import axios from "axios"
import { ADD_PROJECT_FAIL, ADD_PROJECT_REQUEST, ADD_PROJECT_SUCCESS, DELETE_PROJECT_FAIL, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DETAIL_PROJECT_FAIL, DETAIL_PROJECT_REQUEST, DETAIL_PROJECT_SUCCESS, GET_PROJECT_FAIL, GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, UPDATE_PROJECT_FAIL, UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS } from "../constants/projectConstants"

export const getListProjects = () => async (dispatch) => {
    try{

        dispatch({ type: GET_PROJECT_REQUEST })

        const { data } = await axios.get('http://127.0.0.1:8000/api/')

        dispatch({
            type: GET_PROJECT_SUCCESS,
            payload: data
        })

    }catch (error) {

        dispatch({ 
            type: GET_PROJECT_FAIL,
            payload: error.response && error.response.data.message
         })


    }

}





export const addProject = (projectData) => async (dispatch) => {
    try{

        dispatch({ type: ADD_PROJECT_REQUEST })

        const { data } = await axios.post('http://127.0.0.1:8000/api/', projectData)

        dispatch({
            type: ADD_PROJECT_SUCCESS,
            payload: data
        })

    }catch (error) {

        dispatch({ 
            type: ADD_PROJECT_FAIL,
            payload: error.response && error.response.data.message
         })


    }

}


export const getDetailProject = (id) => async (dispatch) => {
    try{

        dispatch({ type: DETAIL_PROJECT_REQUEST })

        const { data } = await axios.get(`http://127.0.0.1:8000/api/${id}/`)

        dispatch({
            type: DETAIL_PROJECT_SUCCESS,
            payload: data
        })

    }catch (error) {

        dispatch({ 
            type: DETAIL_PROJECT_FAIL,
            payload: error.response && error.response.data.message
         })


    }

}


export const updateProject = (id, projectData) => async (dispatch) => {
    try{

        dispatch({ type: UPDATE_PROJECT_REQUEST })

        const { data } = await axios.put(`http://127.0.0.1:8000/api/${id}/`, projectData)

        dispatch({
            type: UPDATE_PROJECT_SUCCESS,
            payload: data
        })

    }catch (error) {

        dispatch({ 
            type: UPDATE_PROJECT_FAIL,
            payload: error.response && error.response.data.message
         })


    }

}

export const deleteProject = (id) => async (dispatch) => {
    try{

        dispatch({ type: DELETE_PROJECT_REQUEST })

        const { data } = await axios.delete(`http://127.0.0.1:8000/api/${id}/`);

        dispatch({
            type: DELETE_PROJECT_SUCCESS,
            payload: data
        })

    }catch (error) {

        dispatch({ 
            type: DELETE_PROJECT_FAIL,
            payload: error.response && error.response.data.message
         })


    }

}



