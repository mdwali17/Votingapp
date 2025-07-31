import axios from 'axios'
// import {config} from 'dotenv';
const API=axios.create({
    baseURL:'http://localhost:3000',
    headers:{
        'Content-Type':'application/json',
    },
});
export default API;