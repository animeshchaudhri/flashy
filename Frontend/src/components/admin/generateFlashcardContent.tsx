import { model } from "../../services/Aiservice";

interface FlashcardContent {
  title: string;
  description: string;
}

async function generateFlashcardContent(
  topic: string
): Promise<FlashcardContent> {
  try {
    const prompt = `Generate a flashcard about ${topic}. Provide a concise title (question) and concise short description (answer) for flashcard . Format the response as a JSON object with 'title' and 'description' fields and very random text.`;

    const data = await model.generateContent(prompt);
    const responseText = data.response.text();

    let parsedContent: FlashcardContent;
    try {
      parsedContent = JSON.parse(responseText);
    } catch (error) {
      if (
        responseText.includes("```json\n") &&
        responseText.includes("\n```")
      ) {
        const jsonContent = responseText
          .trim()
          .split("```json\n")[1]
          .split("\n```")[0];
        parsedContent = JSON.parse(jsonContent);
      } else {
        throw new Error("Response format is incorrect.");
      }
    }

    if (!parsedContent.title || !parsedContent.description) {
      throw new Error("Generated content is missing title or description.");
    }

    return parsedContent;
  } catch (error) {
    console.error("Error generating flashcard content:", error);
    throw error;
  }
}

export default generateFlashcardContent;
