import { Context } from "hono";
import { getCareerInterestById,getStudentCareerInterests, createCareerInterestService,deleteCareerInterestService,updateCareerInterestService,AllCareerInterestsService,} from "./services.js";

export const listCareerInterests = async (c: Context) => {
    try {
        //limit the number of CareerInterests to be returned
    
        const limit = Number(c.req.query('limit'))
    
        const data = await AllCareerInterestsService(limit);
        if (data == null || data.length == 0) {
            return c.text("career interest not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

// Get career interest by id
export const getCareerInterest = async (c:Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        console.log(id);
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const careerInterest = await getCareerInterestById(id);
        if (careerInterest === null) {
            return c.text("career interest not found", 404);
        }
        return c.json(careerInterest, 200);

    }catch(error:any){
        console.error(error?.message);
    }
};

// Create career interest
export const createCareerInterest = async (c:Context) => {
    try{
        const careerInterest = await c.req.json();
        const createdCareerInterest = await createCareerInterestService(careerInterest);

        if (!createdCareerInterest) return c.text("career interest not created", 404);
        return c.json({ msg: createdCareerInterest }, 201);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Update career interest
export const updateCareerInterest = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const careerInterest = await c.req.json();
    try{
        const updatedCareerInterest = await updateCareerInterestService(id, careerInterest);
        return c.json({ msg: updatedCareerInterest }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Delete career interest
export const deleteCareerInterest = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try{
        const deletedCareerInterest = await deleteCareerInterestService(id);
        return c.json({ msg: deletedCareerInterest }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Get student career interests
export const getingStudentCareerInterests = async (c:Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const studentCareerInterests = await getStudentCareerInterests(id);
        if (studentCareerInterests === null) {
            return c.text("student career interests not found", 404);
        }
        return c.json(studentCareerInterests, 200);
    }catch(error:any){
        console.error(error?.message);
    }
};