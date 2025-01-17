import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIsubjects, subjects, TSsubjects } from "../drizzle/schema";


export const AllSubjectsService = async (limit?: number): Promise<TSsubjects[] | null> => {
    if (limit) {
        return await db.query.subjects.findMany({
            limit: limit,
        });
    }
    return await db.query.subjects.findMany();
};

export async function getSubjectById(id: number): Promise<Array<TSsubjects>> {
    return db.select().from(subjects).where(eq(subjects.subject_id, id));
}

export async function createSubjectService(data: TIsubjects) {
    await db.insert(subjects).values(data);
    return "Subject created successfully";
}

export async function updateSubjectService(id: number, subject: TIsubjects) {
    await db.update(subjects).set(subject).where(eq(subjects.subject_id, id));
    return "Subject updated successfully";
}

export async function deleteSubjectService(id: number) {
    await db.delete(subjects).where(eq(subjects.subject_id, id));
    return "Subject deleted successfully";
}
