import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TIRecommendations,TSRecommendations, recommendations } from "../drizzle/schema";


export const AllRecommendationsService = async ( limit?: number): Promise<TSRecommendations[] | null> => {
    if (limit) {
        return await db.query.recommendations.findMany({
            limit: limit,
        });
    }
    return await db.query.recommendations.findMany();
}

export async function getRecommendationsById(id: number): Promise<Array<TSRecommendations>> {
    return db.select().from(recommendations).where(eq(recommendations.recommendations_id, id));
}

export async function createRecommendationsService(data: TIRecommendations) {
    await db.insert(recommendations).values(data);
    return "Recommendations created successfully";
}

export async function updateRecommendationsService(id: number, recommendationsData: TIRecommendations) {
    await db.update(recommendations).set(recommendationsData).where(eq(recommendations.recommendations_id, id));
    return "Recommendations updated successfully";
}

export async function deleteRecommendationsService(id: number) {
    await db.delete(recommendations).where(eq(recommendations.recommendations_id, id));
    return "Recommendations deleted successfully";
}

// student recommendation services
export async function getStudentRecommendations(id: number) {
    return await db.query.students.findMany({
        where: (fields, { eq }) => eq(fields.student_id, id),
        columns: {
            student_id: true,
            username: true,
        },
        with: {
            recommendations: {
                columns: {
                    recommendations_id: true,
                    student_recommendations: true,
                },
            },
        },
    });
}