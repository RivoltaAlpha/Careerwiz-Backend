import { Context } from "hono";
import { getRecommendationsById, createRecommendationsService,updateRecommendationsService,deleteRecommendationsService,AllRecommendationsService,getStudentRecommendations, getStudentRecommendationAttributes} from "./services";

export const listRecommendations = async (c: Context) => {
    try {
        //limit the number of Recommendations to be returned
    
        const limit = Number(c.req.query('limit'))
    
        const data = await AllRecommendationsService(limit);
        if (data == null || data.length == 0) {
            return c.text("recommendations not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

// Get recommendations by id
export const getRecommendations = async (c:Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        console.log(id);
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const recommendations = await getRecommendationsById(id);
        if (recommendations === null) {
            return c.text("recommendations not found", 404);
        }
        return c.json(recommendations, 200);

    }catch(error:any){
        console.error(error?.message);
    }
};

// Create recommendations
export const createRecommendations = async (c:Context) => {
    try{
        const recommendations = await c.req.json();
        const createdRecommendations = await createRecommendationsService(recommendations);

        if (!createdRecommendations) return c.text("recommendations not created", 404);
        return c.json({ msg: createdRecommendations }, 201);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Update recommendations
export const updateRecommendations = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const recommendations = await c.req.json();
    try{
        const updatedRecommendations = await updateRecommendationsService(id, recommendations);
        return c.json({ msg: updatedRecommendations }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Delete recommendations
export const deleteRecommendations = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try{
        const deletedRecommendations = await deleteRecommendationsService(id);
        return c.json({ msg: deletedRecommendations }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// get student recommendations
export const getStudentsRecommendations = async (c:Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        console.log(id);
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const recommendations = await getStudentRecommendations(id);
        if (recommendations === null) {
            return c.text("recommendations not found", 404);
        }
        return c.json(recommendations, 200);

    }catch(error:any){
        console.error(error?.message);
    }
};

// get student recommendations attributes
export const getStudentsRecommendationsAttributes = async (c:Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        console.log(id);
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const recommendations = await getStudentRecommendationAttributes(id);
        if (recommendations === null) {
            return c.text("recommendations not found", 404);
        }
        return c.json(recommendations, 200);

    }catch(error:any){
        console.error(error?.message);
    }
}