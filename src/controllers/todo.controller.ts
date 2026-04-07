import type { Request , Response } from "express";
import {prisma} from "../../lib/prisma.js";



// create todo
export const todoCreate = async (req : Request, res : Response ) => {
    try {
      const { title, description, authorId} = req.body;

      // check if user exist before creating the a todo 
      const checkUser = await prisma.user.findUnique({where : {id : authorId}});
      if(!checkUser) {
        return res.json(404).json({ error : "user not found !!"})
      }

      const newTodo = await prisma.user.create({
        data : {
          title,
          description, 
          authorId,
        },
      });

      return res.status(200).json({message : "todo created!!", todo:newTodo});
    } catch (error) {
      return res.status(500).json({error : "failed to create todo"});
    }
};

// fetch all todo that related to single or unique user 
export const getAllTodo = async (req : Request, res: Response) => {
  try {
    if (!req.params.userId || typeof req.params.userId !== 'string') {
      return res.status(400).json({ error: "Invalid or missing userId" });
    }
    const userId = parseInt(req.params.userId);

    const todos = await prisma.todo.findMany({
      where : {authorId : userId},
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({error : "failed to fetch todos"})
  }
}