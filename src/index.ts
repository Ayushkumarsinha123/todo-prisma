import { PrismaClient } from '@prisma/client';
import express from "express"
const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

//hello world route 

app.get('/', (req, res) => {
  res.status(200).json({
    message :"hello world!!"
  });
});

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});