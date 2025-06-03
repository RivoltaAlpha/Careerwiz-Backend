import { Context } from "hono";
import { hash } from 'bcrypt';
import { getStudentById, createStudentService,updateStudentService,deleteStudentService,studentsService,} from "./services.js";

export const listStudents = async (c: Context) => {
  try {
      //limit the number of Students to be returned

      const limit = Number(c.req.query('limit'))

      const data = await studentsService(limit);
      if (data == null || data.length == 0) {
          return c.text("student not found", 404)
      }
      return c.json(data, 200);
  } catch (error: any) {
      return c.json({ error: error?.message }, 400)
  }
}

//search student
export const getStudent = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    console.log(id);
    
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const student = await getStudentById(id);
    if (student === null) {
      return c.text("student not found", 404);
    }
    return c.json(student, 200);
  } catch (error: any) {
    console.error(error?.message);
  }
};

// create student
export const createStudent = async (c: Context) => {
  try {
    const student = await c.req.json();
    const pass = student.password;
    const hashedPassword = await hash(pass, 10);
    student.password = hashedPassword;
    const createdStudent = await createStudentService(student);

    if (!createdStudent) return c.text("student not created", 404);
    return c.json({ msg: createdStudent }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
// updatestudent
export const updateStudent = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const student = await c.req.json();
  try {
    // search for the student
    const searchedStudent = await getStudentById(id);
    if (searchedStudent == undefined) return c.text("student not found", 404);
    // get the data and update it
    const res = await updateStudentService(id, student);
    // return a success message
    if (!res) return c.text("student not updated", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

//delete student
export const deleteStudent = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  try {
    //search for the student
    const student = await getStudentById(id);
    if (student == undefined) return c.text("student not found", 404);
    //deleting the student
    const res = await deleteStudentService(id);
    if (!res) return c.text("student not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
