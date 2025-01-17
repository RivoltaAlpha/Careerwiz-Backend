import { Context } from "hono";
import { AllPersonalIntrestsService, createPersonalIntrestService, updatePersonalIntrestService,deletePersonalIntrestService, getPersonalIntrestById } from "./services";


export const listPersonalIntrests = async (c: Context) => {
    try {
        //limit the number of Intrestss to be returned
    
        const limit = Number(c.req.query('limit'))

        const data = await AllPersonalIntrestsService(limit);
        if (data == null || data.length == 0) {
            return c.text("personal intrests not found", 404)
        }
        return c.json(data, 200);
    }
    catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

// Get Intrests by id
export const getPersonalIntrest = async (c:Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        console.log(id);
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const personalIntrest = await getPersonalIntrestById(id);
        if (personalIntrest === null) {
            return c.text("personal intrest not found", 404);
        }
        return c.json(personalIntrest, 200);

    }catch(error:any){
        console.error(error?.message);
    }
};

// Create Intrests
export const createPersonalIntrest = async (c:Context) => {
    try{
        const personalIntrest = await c.req.json();
        const createdPersonalIntrest = await createPersonalIntrestService(personalIntrest);

        if (!createdPersonalIntrest) return c.text("personal intrest not created", 404);
        return c.json({ msg: createdPersonalIntrest }, 201);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Update Intrests
export const updatePersonalIntrest = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const personalIntrest = await c.req.json();
    try{
        const updatedPersonalIntrest = await updatePersonalIntrestService(id, personalIntrest);
        return c.json({ msg: updatedPersonalIntrest }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Delete Intrests
export const deletePersonalIntrest = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try{
        const deletedPersonalIntrest = await deletePersonalIntrestService(id);
        return c.json({ msg: deletedPersonalIntrest }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};
