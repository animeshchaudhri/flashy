import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_SOME_KEY || "YOUR_API";
console.log(apiKey);
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
