import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TScareerInterests, careerInterests, TIcareerInterests } from "../drizzle/schema";
import exp = require("constants");

export const AllCareerInterestsService = async (limit?: number): Promise<TScareerInterests[] | null> => {
    if (limit) {
        return await db.query.careerInterests.findMany({
            limit: limit,
        });
    }
    return await db.query.careerInterests.findMany();
}

export async function getCareerInterestById(id: number): Promise<Array<TScareerInterests>> {
    return db.select().from(careerInterests).where(eq(careerInterests.careerInterests_id, id));
}

export async function createCareerInterestService(data: TIcareerInterests) {
    await db.insert(careerInterests).values(data);
    return "Career Interest created successfully";
}

export async function updateCareerInterestService(id: number, careerInterest: TIcareerInterests) {
    await db.update(careerInterests).set(careerInterest).where(eq(careerInterests.careerInterests_id, id));
    return "Career Interest updated successfully";
}

export async function deleteCareerInterestService(id: number) {
    await db.delete(careerInterests).where(eq(careerInterests.careerInterests_id, id));
    return "Career Interest deleted successfully";
}

// student career intrest services
export async function getStudentCareerInterests(id: number) {
    return await db.query.students.findMany({
        where: (fields, { eq }) => eq(fields.student_id, id),
        columns: {
            student_id: true,
            username: true,
        },
        with: {
            careerInterests: {
                columns: {
                    careerInterests_id: true,
                },
                    with: {
                        career: {
                            columns: {
                                career_id: true,
                                career_name: true,
                                description: true,
                                requirements: true,
                                subjects: true,
                                interests: true,
                            },
                        },
                    },
            },
        },
    });
}