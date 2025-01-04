import { Hono, Context } from "hono";
import { getStudent,createStudent,updateStudent,deleteStudent,listStudents } from "./controller";
import { zValidator } from "@hono/zod-validator";
import { StudentSchema } from "../validator";


export const studentRouter = new Hono();

studentRouter.get('/students', listStudents);
studentRouter.get('/student/:id', getStudent);

studentRouter.post("/student", zValidator('json', StudentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createStudent);

studentRouter.put('/student/:id', zValidator(  'json', StudentSchema), updateStudent);

studentRouter.delete('/student/:id', deleteStudent)