import { Context } from "hono";
import { getCareerById, createCareerService,updateCareerService,deleteCareerService,AllCareersService,} from "./services";

export const listCareers = async (c: Context) => {
    try {
        //limit the number of Careers to be returned
    
        const limit = Number(c.req.query('limit'))
    
        const data = await AllCareersService(limit);
        if (data == null || data.length == 0) {
            return c.text("career not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

// Get career by id
export const getCareer = async (c:Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        console.log(id);
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const career = await getCareerById(id);
        if (career === null) {
            return c.text("career not found", 404);
        }
        return c.json(career, 200);

    }catch(error:any){
        console.error(error?.message);
    }
};

// Create career
export const createCareer = async (c:Context) => {
    try{
        const career = await c.req.json();
        const createdCareer = await createCareerService(career);

        if (!createdCareer) return c.text("career not created", 404);
        return c.json({ msg: createdCareer }, 201);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Update career
export const updateCareer = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const career = await c.req.json();
    try{
        const updatedCareer = await updateCareerService(id, career);
        return c.json({ msg: updatedCareer }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Delete career
export const deleteCareer = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try{
        const deletedCareer = await deleteCareerService(id);
        return c.json({ msg: deletedCareer }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};