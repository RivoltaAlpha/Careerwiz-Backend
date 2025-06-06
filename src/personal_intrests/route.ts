import { Hono } from "hono";
import {listPersonalIntrests, updatePersonalIntrest, createPersonalIntrest, deletePersonalIntrest,getPersonalIntrest,getStudentIntrests } from "./controller.js"

export const personalIntrestsRouter = new Hono();

personalIntrestsRouter.get('/all-personal-intrests', listPersonalIntrests);
personalIntrestsRouter.get('/get-personal-intrest/:id', getPersonalIntrest);
personalIntrestsRouter.post('/create-personal-intrest', createPersonalIntrest);
personalIntrestsRouter.put('/update-personal-intrest/:id', updatePersonalIntrest);
personalIntrestsRouter.delete('/delete-personal-intrest/:id', deletePersonalIntrest);
personalIntrestsRouter.get('/get-student-intrests/:id', getStudentIntrests);