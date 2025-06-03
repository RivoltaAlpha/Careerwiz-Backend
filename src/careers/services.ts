import db from "../drizzle/db.js";
import { eq } from "drizzle-orm";
import { TICareers, careers, TSCareers } from "../drizzle/schema.js";


export const AllCareersService = async (limit?: number): Promise<TSCareers[] | null> => {
    if (limit) {
        return await db.query.careers.findMany({
            limit: limit,
        });
    }
    return await db.query.careers.findMany();
}

export async function getCareerById(id: number): Promise<Array<TSCareers>> {
    return db.select().from(careers).where(eq(careers.career_id, id));
}

export async function createCareerService(data: TICareers) {
    await db.insert(careers).values(data);
    return "Career created successfully";
}

export async function updateCareerService(id: number, career: TICareers) {
    await db.update(careers).set(career).where(eq(careers.career_id, id));
    return "Career updated successfully";
}

export async function deleteCareerService(id: number) {
    await db.delete(careers).where(eq(careers.career_id, id));
    return "Career deleted successfully";
}