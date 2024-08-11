import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "";
const genAI = new GoogleGenerativeAI(apiKey);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
