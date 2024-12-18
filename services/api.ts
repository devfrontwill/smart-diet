import axios from 'axios';

// |baseURL|http://192.168.1.6:3333|baseURL| /create

export const api = axios.create({
    baseURL: "http://192.168.1.6:3333"
})