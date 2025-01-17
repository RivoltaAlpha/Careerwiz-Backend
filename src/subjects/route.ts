import { Hono } from "hono";
import { listSubjects, getSubject, createSubject, updateSubject, deleteSubject } from "./controller";

export const subjectsRouter = new Hono();

subjectsRouter.get('/all-subjects', listSubjects);
subjectsRouter.get('/get-subject/:id', getSubject);
subjectsRouter.post('/create-subject', createSubject);
subjectsRouter.put('/update-subject/:id', updateSubject);
subjectsRouter.delete('/delete-subject/:id', deleteSubject);