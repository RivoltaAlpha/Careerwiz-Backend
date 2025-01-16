import { Hono } from "hono";
import { listFeedback, getFeedback, createFeedback, updateFeedback, getStudentFeedback } from "./controller";

export const feedbackRouter = new Hono();

feedbackRouter.get('/all-feedback', listFeedback);
feedbackRouter.get('/get-feedback/:id', getFeedback);
feedbackRouter.post('/create-feedback', createFeedback);
feedbackRouter.put('/update-feedback/:id', updateFeedback);
feedbackRouter.delete('/delete-feedback/:id', getStudentFeedback);
feedbackRouter.get('/get-student-feedback/:id', getStudentFeedback);