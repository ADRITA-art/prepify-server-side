import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/database.mjs';
import userRoutes from './routes/usersRoutes.mjs';
import cors from 'cors';



const app = express();
connectDB();

app.use(bodyParser.json());
app.use (express.json());
app.use (
                        cors(
                                                {
                                                                        origin:"*",
                                                }
                        )
)

app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
 res.send('Hello World');
 });

 app.listen(5000, () => {
  console.log('Server is running. ');
  });