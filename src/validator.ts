import { z } from 'zod';

export const userSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    image_url: z.string(),
    role: z.string()
});

export const StudentSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string(),
    password: z.string(),
    email: z.string().optional(),
    role: z.string(),
    contact: z.string().optional(),
    school: z.string(),
});

export const loginUserShema = z.object({
    username: z.string(),
    password: z.string(),
});

export const registerUserShema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional(),
});