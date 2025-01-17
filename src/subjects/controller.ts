import { Context } from "hono";
import { getSubjectById, createSubjectService,updateSubjectService,deleteSubjectService,AllSubjectsService,} from "./services";

export const listSubjects = async (c: Context) => {
    try {
        //limit the number of Subjects to be returned
    
        const limit = Number(c.req.query('limit'))
    
        const data = await AllSubjectsService(limit);
        if (data == null || data.length == 0) {
            return c.text("subject not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

// Get subject by id
export const getSubject = async (c:Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        console.log(id);
        if (isNaN(id)) return c.text("Invalid ID", 400);

        const subject = await getSubjectById(id);
        if (subject === null) {
            return c.text("subject not found", 404);
        }
        return c.json(subject, 200);

    }catch(error:any){
        console.error(error?.message);
    }
};

// Create subject
export const createSubject = async (c:Context) => {
    try{
        const subject = await c.req.json();
        const createdSubject = await createSubjectService(subject);

        if (!createdSubject) return c.text("subject not created", 404);
        return c.json({ msg: createdSubject }, 201);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Update subject
export const updateSubject = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const subject = await c.req.json();
    try{
        const updatedSubject = await updateSubjectService(id, subject);
        return c.json({ msg: updatedSubject }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};

// Delete subject
export const deleteSubject = async (c:Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try{
        const deletedSubject = await deleteSubjectService(id);
        return c.json({ msg: deletedSubject }, 200);
    }catch(error:any){
        return c.json({ error: error?.message }, 400);
    }
};