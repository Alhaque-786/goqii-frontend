import axios from 'axios';

const API_URL = 'http://localhost:5001/api/comments';

export const getComments = () => axios.get(API_URL);
export const createComment = (comment) => axios.post(API_URL, comment);
export const updateComment = (id, comment) => axios.patch(`${API_URL}/${id}`, comment);
export const deleteComment = (id) => axios.delete(`${API_URL}/${id}`);
