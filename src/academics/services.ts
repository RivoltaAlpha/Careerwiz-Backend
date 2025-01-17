import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIacademics, academics, TSacademics } from "../drizzle/schema";


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