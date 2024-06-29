import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/usersModel.mjs';
import { ChatAnthropic } from '@langchain/anthropic';

const model = new ChatAnthropic({
                        apiKey: process.env.ANTHROPIC_API_KEY,
                        model: "claude-3-5-sonnet-20240620",
                        maxTokens: 1024,
                        temperature: 0.9,
});

const generateContentForInterests = async (interests) => {
                        const modules = [];
                        for (const interest of interests) {
                                                const response = await model.invoke(`Create a module about ${interest}.`);
                                                modules.push({
                                                                        interest,
                                                                        content: response,
                                                });
                        }
                        return modules;
};

export const generateContent = async (req, res) => {
                        const userId = req.userId;
                        console.log("User ID from token:", userId);
                        if (!mongoose.Types.ObjectId.isValid(userId)) {
                                                return res.status(400).json({ message: 'Invalid User ID format' });
                        }

                        try {
                                                const user = await User.findById(userId);
                                                if (!user) {
                                                                        return res.status(404).json({ message: 'User not found' });
                                                }

                                                const userModules = await generateContentForInterests(user.aoi);
                                                res.json({
                                                                        userId: user._id,
                                                                        name: user.name,
                                                                        modules: userModules,
                                                });
                        } catch (error) {
                                                console.error('Error generating content:', error);
                                                res.status(500).json({ message: 'Server error' });
                        }
};
