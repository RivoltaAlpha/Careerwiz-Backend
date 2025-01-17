import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import {TIstudents,students,TSstudents,} from "../drizzle/schema";

export const studentsService = async (
  limit?: number
): Promise<TSstudents[] | null> => {
  if (limit) {
    return await db.query.students.findMany({
      limit: limit,
    });
  }
  return await db.query.students.findMany();
};

export async function getStudentById(id: number): Promise<Array<TSstudents>> {
  return db.select().from(students).where(eq(students.student_id, id));
}

export async function createStudentService(data: TIstudents) {
  await db.insert(students).values(data);
  return "Student created successfully";
}

export async function updateStudentService(id: number, student: TIstudents) {
  await db.update(students).set(student).where(eq(students.student_id, id));
  return "Student updated successfully";
}

export async function deleteStudentService(id: number) {
  await db.delete(students).where(eq(students.student_id, id));
  return "Student deleted successfully";
}
