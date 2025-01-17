import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIpersonalIntrests, personalIntrests, TSpersonalIntrests } from "../drizzle/schema";

export const AllPersonalIntrestsService = async (limit?: number): Promise<TSpersonalIntrests[] | null> => {
    if (limit) {
        return await db.query.personalIntrests.findMany({
            limit: limit,
        });
    }
    return await db.query.personalIntrests.findMany();
}

export async function getPersonalIntrestById(id: number): Promise<Array<TSpersonalIntrests>> {
    return db.select().from(personalIntrests).where(eq(personalIntrests.id, id));
}

export async function createPersonalIntrestService(data: TIpersonalIntrests) {
    await db.insert(personalIntrests).values(data);
    return "Personal Intrest created successfully";
}

export async function updatePersonalIntrestService(id: number, personalIntrest: TIpersonalIntrests) {
    await db.update(personalIntrests).set(personalIntrest).where(eq(personalIntrests.id, id));
    return "Personal Intrest updated successfully";
}

export async function deletePersonalIntrestService(id: number) {
    await db.delete(personalIntrests).where(eq(personalIntrests.id, id));
    return "Personal Intrest deleted successfully";
}