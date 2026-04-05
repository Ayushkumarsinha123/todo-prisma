import { type AnyZodObject, ZodError } from 'zod';
import { type Request, type Response, type NextFunction } from 'express';

export const validate = (schema : AnyZodObject ) => {
  return (req : Request , res : Response , next : NextFunction) : void => {
    try {
      
      schema.parse(req.body);
      next(); 
    } catch (error) {
      if (error instanceof ZodError) {
        
        res.status(400).json({
          message: "Validation failed",
          errors: error.issues.map(err => ({ field: err.path[0], message: err.message }))
        });
        return; 
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }
}