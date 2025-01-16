import { Hono } from "hono";
import { listRecommendations,deleteRecommendations, getRecommendations, createRecommendations, updateRecommendations, getStudentRecommendations } from "./controller";

export const recommendationsRouter = new Hono();

recommendationsRouter.get('/all-recommendations', listRecommendations);
recommendationsRouter.get('/get-recommendation/:id', getRecommendations);
recommendationsRouter.post('/create-recommendations', createRecommendations);
recommendationsRouter.put('/update-recommendation/:id', updateRecommendations);
recommendationsRouter.delete('/delete-recommendation/:id', deleteRecommendations);
recommendationsRouter.get('/get-student-recommendations/:id', getStudentRecommendations);