import type { Request, Response } from 'express';
import {prisma} from '../../lib/prisma.js'
export const signup = async (req : Request , res : Response) => {
    try {
      const {name , email , password} = req.body;

      //check if the user exist
      const existingUser = await prisma.user.findUnique({where : {email}});
      if(existingUser) {
        return res.status(400).json({message : "Email already exist"})
      }

      //create userin db

      const user = await prisma.user.create({
        data : {name , email , password}
      })
      return res.status(200).json({message : "user is created ",user})
    } catch (error) {
      return res.status(500).json({error});
    }
};