
import { z } from 'zod';


// define valid signup request looks like 

export const SignupSchema = z.object({
  name : z.string().min(2, "name must be at least 2 characters"),
  email : z.email("invalid email format"),
  password : z.string().min(6, "password must be at least 6 characters long"),
});

// definr valid todo creation request look like

export const CreateTodoSchema = z.object({
  title : z.string().min(1, "title is required"),
  description : z.string().optional(),
  authorId: z.number().int("Author ID must be an integer"),
})