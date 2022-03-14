import axios from 'axios'

axios.defaults.withCredentials = true;
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.resolve({ error });
});

export default axios.create({
    baseURL: process.env.REACT_APP_SERVER_DOMAIN
});