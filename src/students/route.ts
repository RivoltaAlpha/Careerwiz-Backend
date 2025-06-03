import { Hono } from "hono";
import { getStudent,createStudent,updateStudent,deleteStudent,listStudents } from "./controller.js";
import { zValidator } from "@hono/zod-validator";
import { StudentSchema } from "../validator.js";


export const studentRouter = new Hono();

studentRouter.get('/students', listStudents);
studentRouter.get('/get-student/:id', getStudent);

studentRouter.post("/create-student", zValidator('json', StudentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createStudent);

studentRouter.put('/update-student/:id', zValidator(  'json', StudentSchema), updateStudent);

studentRouter.delete('/delete-student/:id', deleteStudent)