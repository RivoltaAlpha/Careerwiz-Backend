import { Hono } from "hono";
import { listAcademics, getAcademic, createAcademic, updateAcademic, deleteAcademic } from "./controller";

export const academicsRouter = new Hono();

academicsRouter.get('/all-academics', listAcademics);
academicsRouter.get('/get-academic/:id', getAcademic);
academicsRouter.post('/create-academic', createAcademic);
academicsRouter.put('/update-academic/:id', updateAcademic);
academicsRouter.delete('/delete-academic/:id', deleteAcademic);