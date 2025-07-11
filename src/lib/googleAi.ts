import {GoogleGenerativeAI} from "@google/generative-ai"

//Env
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});

export default model;