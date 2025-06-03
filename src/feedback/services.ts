import db from "../drizzle/db.js";
import { eq } from "drizzle-orm";
import {TIFeedback,feedback,TSFeedback,} from "../drizzle/schema.js";


export const AllfeedbackService = async ( limit?: number): Promise<TSFeedback[] | null> => {
    if (limit) {
        return await db.query.feedback.findMany({
            limit: limit,
        });
    }
    return await db.query.feedback.findMany();
}

// fetch specific feedback from  the database using its ID
export async function getFeedbackById(id: number): Promise<Array<TSFeedback>> {
    return db.select().from(feedback).where(eq(feedback.feedback_id, id));
}

export async function createFeedbackService(data: TIFeedback) {
    await db.insert(feedback).values(data);
    return "Feedback created successfully";
}

export async function updateFeedbackService(id: number, feedbackData: TIFeedback) {
    await db.update(feedback).set(feedbackData).where(eq(feedback.feedback_id, id));
    return "Feedback updated successfully";
}

export async function deleteFeedbackService(id: number) {
    await db.delete(feedback).where(eq(feedback.feedback_id, id));
    return "Feedback deleted successfully";
}

// get student feedback
export async function getStudentFeedback(id: number) {
    return await db.query.students.findMany({
      where: (fields, {eq}) => eq(fields.student_id, id),
      columns:{
        student_id: true,
        username: true,
      },
      with: {
        feedback: {
          columns: {
            feedback_id: true,
            name: true,
            email: true,
            message: true,
          },
        },
      },
      });
  }