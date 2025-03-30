import { Context } from "hono";
import { getAcademicById, createAcademicService,updateAcademicService,deleteAcademicService,AllAcademicsService, getStudentAcademics, getAcademicHistory} from "./services";

export const listAcademics = async (c: Context) => {
    try {
        //limit the number of Academics to be returned
    
        const limit = Number(c.req.query('limit'))
    
        const data = await AllAcademicsService(limit);
        if (data == null || data.length == 0) {
            return c.text("academic not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

// Get academic by id
export const getAcademic = async (c:Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        console.log(id);
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const academic = await getAcademicById(id);
        if (academic === null) {
            return c.text("academic not found", 404);
        }
        return c.json(academic, 200);

    }catch(error:any){
        console.error(error?.message);
    }
};

// Create academic
export const createAcademic = async (c:Context) => {
    try{
        const academic = await c.req.json();
        const createdAcademic = await createAcademicService(academic);

        if (!createdAcademic) return c.text("academic not created", 404);
        return c.json({ msg: createdAcademic }, 201);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Update academic
export const updateAcademic = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const academic = await c.req.json();
    try{
        const updatedAcademic = await updateAcademicService(id, academic);
        return c.json({ msg: updatedAcademic }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Delete academic
export const deleteAcademic = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try{
        const deletedAcademic = await deleteAcademicService(id);
        return c.json({ msg: deletedAcademic }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// student academic services
export const getStudentsAcademics = async (c:Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const studentAcademics = await getStudentAcademics(id);
        if (studentAcademics === null) {
            return c.text("student academics not found", 404);
        }
        return c.json(studentAcademics, 200);

    }catch(error:any){
        console.error(error?.message);
    }
};

// Get academic history
export const getAcademicHistories = async (c:Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const studentAcademics = await getAcademicHistory(id);
        if (studentAcademics === null) {
            return c.text("student academics not found", 404);
        }
        return c.json(studentAcademics, 200);

    }catch(error:any){
        console.error(error?.message);
    }
};