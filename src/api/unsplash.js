import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID -t5CokEJ00-R4mqoCBKYl3ztEO0nxhOZxdHAtKaqVvE'
    }
})