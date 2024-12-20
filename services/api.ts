import axios from 'axios';

export const api = axios.create({
    baseURL: "https://dieta-ai-backend.vercel.app/"
})