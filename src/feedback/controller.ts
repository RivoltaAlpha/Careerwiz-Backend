import {Context} from "hono";
import { getFeedbackById, createFeedbackService,updateFeedbackService,deleteFeedbackService,AllfeedbackService,getStudentFeedback} from "./services";
import { error } from "console";

export const listFeedback = async (c: Context) => {
    try {
        //limit the number of feedbacks to be returned
    
        const limit = Number(c.req.query('limit'))
    
        const data = await AllfeedbackService(limit);
        if (data == null || data.length == 0) {
            return c.text("feedback not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

// Get feedback by id
export const getFeedback = async (c:Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        console.log(id);
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const feedback = await getFeedbackById(id);
        if (feedback === null) {
            return c.text("feedback not found", 404);
        }
        return c.json(feedback, 200);

    }catch(error:any){
        console.error(error?.message);
    }
};

// Create feedback
export const createFeedback = async (c:Context) => {
    try{
        const feedback = await c.req.json();
        const createdFeedback = await createFeedbackService(feedback);

        if (!createdFeedback) return c.text("feedback not created", 404);
        return c.json({ msg: createdFeedback }, 201);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Update feedback
export const updateFeedback = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const feedback = await c.req.json();
    try{
        const updatedFeedback = await updateFeedbackService(id, feedback);
        return c.json({ msg: updatedFeedback }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Delete feedback
export const deleteFeedback = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try{
        const deletedFeedback = await deleteFeedbackService(id);
        return c.json({ msg: deletedFeedback }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Get student feedback
export const getStudentsFeedback = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try{
        const feedback = await getStudentFeedback(id);
        return c.json(feedback, 200);
    }
    catch(error:any){     
        return c.json({ error: error?.message }, 400);
    }
};