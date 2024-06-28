import User from '../models/usersModel.mjs';
import geminiServices from '../services/geminiServices.mjs';
const topic=["react","node","css"];
                      for(var i=0;i<topic.length;i++){
                        await geminiServices(topic[i]);
                        console.log("done");
                        }
                        console.log("sad");
                        

/*const create = async (req, res) => {
    const email= req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {                      
            return res.status(400).json({ message: 'register first' });
        }
        const len=existingUser.aoi.length;
        for(var i=0;i<len;i++){
            geminiServices(existingUser.aoi[i]);
            }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};*/