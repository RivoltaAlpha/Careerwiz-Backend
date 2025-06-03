import { Hono } from "hono";
import { listCareers, getCareer, createCareer, updateCareer, deleteCareer } from "./controller.js";

export const careersRouter = new Hono();

careersRouter.get('/all-careers', listCareers);
careersRouter.get('/get-career/:id', getCareer);
careersRouter.post('/create-career', createCareer);
careersRouter.put('/update-career', updateCareer);
careersRouter.delete('/delete-career/:id', deleteCareer);