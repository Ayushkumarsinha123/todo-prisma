import userRoutes from './routes/user.route.js';
import express from 'express';
console.log("🕵️ SERVER IS CONNECTED TO:", process.env.DATABASE_URL);
const app = express();
app.use(express.json());

//routes 
app.use('/users', userRoutes);

// simple health check for api 

app.get('/', (req, res) => {
  res.status(200).json({message:"api is running"});
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server s running on port--${PORT} `);
})