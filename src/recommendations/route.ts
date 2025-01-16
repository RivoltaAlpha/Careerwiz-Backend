import { Hono } from "hono";
import { listRecommendations, getRecommendations, createRecommendations, updateRecommendations, getStudentRecommendations } from "./controller";

export const recommendationsRouter = new Hono();

recommendationsRouter.get('/all-recommendations', listRecommendations);
recommendationsRouter.get('/get-student-recommendations/:id', getRecommendations);
recommendationsRouter.post('/update-recommendations', createRecommendations);
recommendationsRouter.put('/delete-recommendation/:id', updateRecommendations);
recommendationsRouter.get('/get-student-recommendations/:id', getStudentRecommendations);