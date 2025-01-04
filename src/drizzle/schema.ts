import { relations } from "drizzle-orm";
import {  serial, text,varchar,pgEnum, timestamp, integer, pgTable } from "drizzle-orm/pg-core";


export const students = pgTable("students", {
    student_id: serial("student_id").primaryKey(),
    firstname: varchar("firstname", { length: 50 }).notNull(),
    lastname: varchar("lastname", { length: 50 }).notNull(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    password: varchar("password", { length: 50 }).notNull(),
    email: varchar("email", { length: 50 }).unique(),
    contact: varchar("contact", { length: 50 }),
    student_subjects: varchar("student_subjects", { length: 50 }),
    student_intrests: varchar("student_intrests", { length: 50 }),
    student_recommendations: varchar("student_recommendations"),
    school: varchar("school", { length: 50 }).notNull(),
    role: varchar("role", { length: 50 }).default("student").notNull(),
    date_joined: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const subject_status = pgEnum("subject_name", [''])

export const careers = pgTable("careers",{
    career_id: serial("career_id").primaryKey(),
    career_name: varchar("message", { length: 100 }).notNull(),
    description: text("description"),
    requirements: varchar("message", { length: 100 }).notNull(),
    subjects: varchar("message", { length: 100 }).notNull(),
    interests: varchar("message", { length: 100 }).notNull(),
});

export const recommendations = pgTable("recommendations", {
    recommendations_id: serial("recommendations_id").primaryKey(),
    student_id: integer("students_id").references(() => students.student_id, {onDelete: "cascade"}),
    student_recommendations: varchar("student_recommendations", {length: 1000}).references(() => students.student_recommendations, {onDelete: "cascade"}),

});

export const recommendationRelationships = relations(students, ({ many }) =>({
    students: many(recommendations)
}) )

export const feedback = pgTable("feedback", {
    feedback_id: serial("feedback_id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    email: varchar("email", { length: 50 }).notNull(),
    message: varchar("message", { length: 1000 }).notNull(),
});

export type TIstudents = typeof students.$inferInsert;
export type TSstudents = typeof students.$inferSelect;
export type TICareers = typeof careers.$inferInsert;
export type TSCareets = typeof careers.$inferSelect;
export type TIRecommendations = typeof recommendations.$inferInsert;
export type TSRecommendations = typeof recommendations.$inferSelect;
export type TIFeedback = typeof feedback.$inferInsert;
export type TSFeedback = typeof feedback.$inferSelect;
