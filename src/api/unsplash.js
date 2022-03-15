import axios from 'axios';

console.log(process.env.REACT_APP_API_KEY)

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID -t5CokEJ00-R4mqoCBKYl3ztEO0nxhOZxdHAtKaqVvE'
    }
})