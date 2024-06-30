
import { ChatFireworks } from "@langchain/community/chat_models/fireworks";
import dotenv from 'dotenv';

dotenv.config();

const model = new ChatFireworks({
                        apiKey: process.env.FIREWORKS_API_URL,
                        model: "accounts/fireworks/models/llama-v3-70b-instruct",
                            max_tokens: 1024,
                            top_p: 1,
                            top_k: 40,
                            presence_penalty: 0,
                            frequency_penalty: 0,
                            temperature: 0.6,
                        });
                        
export const quizContent = async (req, res) => {
  const { interest } = req.body;
  if (!interest) {
    return res.status(400).send('Interest is required');
  }


    const prompt = ` Give an mcq quiz of 3 questions on ${interest} each . Send the question and answer as array o objects  `;



            try{      
    const modelResponse = await model.invoke(prompt);
                  
                      res.status(200).json({ content: modelResponse });
                    } catch (error) {
                      console.error('Error generating content:', error);
                      res.status(500).send('Failed to generate content');
                    }
                  };