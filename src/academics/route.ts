import { Hono } from "hono";
import { listAcademics, getAcademic,getStudentsAcademics, createAcademic, updateAcademic, deleteAcademic, getAcademicHistories } from "./controller";

export const academicsRouter = new Hono();

academicsRouter.get('/all-academics', listAcademics);
academicsRouter.get('/get-academic/:id', getAcademic);
academicsRouter.post('/create-academic', createAcademic);
academicsRouter.put('/update-academic/:id', updateAcademic);
academicsRouter.delete('/delete-academic/:id', deleteAcademic);
academicsRouter.get('/get-student-academics/:id', getStudentsAcademics);
academicsRouter.get('/student-history/:id', getAcademicHistories);