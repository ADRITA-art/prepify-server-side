
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
                        
export const generateContentForInterests = async (req, res) => {
  const { interest } = req.body;
  if (!interest) {
    return res.status(400).send('Interest is required');
  }

  
    const prompt = `Create an engaging and attractive study module about ${interest} for students. Include interactive content and images if possible.  At the end of the module, you need to create a multiple-choice quiz with 3 questions. Each question should have 4 options and one correct answer. 

Please provide the questions, options, and answers in the following format:

{
  questions: [
    {
      question: "What is the capital of France?",
      options: ["A) Paris", "B) London", "C) Rome", "D) Berlin"],
      answer: "A"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["A) Earth", "B) Mars", "C) Jupiter", "D) Venus"],
      answer: "B"
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["A) Atlantic Ocean", "B) Indian Ocean", "C) Southern Ocean", "D) Pacific Ocean"],
      answer: "D"
    }
  ]
}
`;


            try{      
    const modelResponse = await model.invoke(prompt);
                  
                      res.status(200).json({ content: modelResponse });
                    } catch (error) {
                      console.error('Error generating content:', error);
                      res.status(500).send('Failed to generate content');
                    }
                  };