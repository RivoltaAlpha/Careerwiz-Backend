import db from "../drizzle/db.js";
import { eq } from "drizzle-orm";
import { TIacademics, academics, TSacademics } from "../drizzle/schema.js";


export const AllAcademicsService = async (limit?: number): Promise<TSacademics[] | null> => {
    if (limit) {
        return await db.query.academics.findMany({
            limit: limit,
        });
    }
    return await db.query.academics.findMany();
}

export async function getAcademicById(id: number): Promise<Array<TSacademics>> {
    return db.select().from(academics).where(eq(academics.academic_id, id));
}

export async function createAcademicService(data: TIacademics) {
    await db.insert(academics).values(data);
    return "Academic created successfully";
}

export async function updateAcademicService(id: number, academic: TIacademics) {
    await db.update(academics).set(academic).where(eq(academics.academic_id, id));
    return "Academic updated successfully";
}

export async function deleteAcademicService(id: number) {
    await db.delete(academics).where(eq(academics.academic_id, id));
    return "Academic deleted successfully";
}

// student academic services
export async function getStudentAcademics(id: number){
    return await db.query.students.findMany({
        where: (fields, { eq }) => eq(fields.student_id, id),
        columns: {
            student_id: true,
            firstname: true,
            lastname:true,
            username: true,
        },
        with: {
            academics: {
                columns: {
                    academic_id: true,
                    student_id: true,
                    subjects: true,
                    academic_history: true,
            },
        },
    },
    });
};

export async function getAcademicHistory(id: number){
    return await db.query.academics.findMany({
        where: (fields, { eq }) => eq(fields.student_id, id),
        columns: {
            subjects: true,
            academic_history: true,
        },
    });
}