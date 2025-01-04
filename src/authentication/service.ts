import  db  from '../drizzle/db';
import { sql} from 'drizzle-orm';
import {  students, TSstudents, TIstudents } from "../drizzle/schema";
import { hash } from 'bcrypt';

export const loginAuthService = async (user:TSstudents ) => {
  const { username } = user;
  try {
    const foundUser = await db.query.students.findFirst({
      columns: {
        student_id: true,
        username: true,
        password: true,
        email: true,
        role: true,
      },
      where: sql` ${students.username} = ${username}`
    });
    console.log('Found user:', foundUser);

    if (!foundUser) {
        throw new Error('User not found');
      }
    return foundUser;
  } catch (error) {
    console.error('Error logging in user:', error);
  }
};

export const RegisteringService = async (user: TIstudents) => {
  try {
    // Log received user data for debugging
    console.log('Registering user:', user);
    const hashedPassword = await hash(user.password, 10);

    // Insert user into `users` table
    const createdUser = await db.insert(students).values({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password: hashedPassword,
      school: user.school,
      role: user.role || 'student',
      date_joined: sql`now()`,
      updated_at: sql`now()`
    }).returning();

    console.log('User created in users table:', createdUser); // Log created user data

    return createdUser[0]; // Return the created user
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('User creation failed');
  }
};