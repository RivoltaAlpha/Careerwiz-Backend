import { Hono } from "hono";
import { listCareerInterests, getCareerInterest, createCareerInterest, updateCareerInterest, deleteCareerInterest } from "./controller";

export const careerInterestsRouter = new Hono();

careerInterestsRouter.get('/all-career-interests', listCareerInterests);
careerInterestsRouter.get('/get-career-interest/:id', getCareerInterest);
careerInterestsRouter.post('/create-career-interest', createCareerInterest);
careerInterestsRouter.put('/update-career-intrest', updateCareerInterest);
careerInterestsRouter.delete('/delete-career-intrest/:id', deleteCareerInterest);