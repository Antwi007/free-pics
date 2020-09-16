import axios from 'axios';

console.log(process.env.REACT_APP_API_KEY)

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: process.env.REACT_APP_API_KEY
    }
})