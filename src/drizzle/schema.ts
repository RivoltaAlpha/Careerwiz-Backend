import { relations } from "drizzle-orm";
import {  serial, text,varchar, timestamp, integer, pgTable, smallint } from "drizzle-orm/pg-core";

// Students
export const students = pgTable("students", {
    student_id: serial("student_id").primaryKey(),
    firstname: varchar("firstname", { length: 50 }).notNull(),
    lastname: varchar("lastname", { length: 50 }).notNull(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    password: varchar("password", { length: 50 }).notNull(),
    email: varchar("email", { length: 50 }).unique(),
    contact: varchar("contact", { length: 50 }),
    school: varchar("school", { length: 50 }).notNull(),
    role: varchar("role", { length: 50 }).default("student").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const studentRelationships = relations(students, ({ many }) => ({
    recommendations: many(recommendations),
    feedback: many(feedback),
    academics: many(academics),
    studentCareers: many(studentCareers),
    personalIntrests: many(personalIntrests)
}))


// Careers
export const careers = pgTable("careers",{
    career_id: serial("career_id").primaryKey(),
    career_name: varchar("career_name", { length: 100 }).notNull(),
    description: text("description").notNull(),
    requirements: varchar("requirements", { length: 100 }).notNull(),
    subjects: varchar("subjects", { length: 100 }).notNull(),
    interests: varchar("interests", { length: 100 }).notNull(),
});
export const careerRelationships = relations(careers, ({ many }) => ({
    studentCareers: many(studentCareers), // A career can be linked to multiple students
  }));
  


// Recommendations
export const recommendations = pgTable("recommendations", {
    recommendations_id: serial("recommendations_id").primaryKey(),
    student_id: integer("student_id").references(() => students.student_id, {onDelete: "cascade"}),
    student_recommendations: text("student_recommendations"),

});
export const recommendationRelationships = relations(recommendations, ({ one }) =>({
    students: one(students, {
        fields:[recommendations.student_id],
        references: [students.student_id],
    }),
}));


// Feedback
export const feedback = pgTable("feedback", {
    feedback_id: serial("feedback_id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    email: varchar("email", { length: 50 }).notNull(),
    message: varchar("message", { length: 2000 }).notNull(),
    student_id: integer("student_id").references(() => students.student_id, { onDelete: "cascade" }),
});
export const feedbackRelationships = relations(feedback, ({ one }) => ({
    student: one(students, {
      fields: [feedback.student_id],
      references: [students.student_id],
    }),
  }));
  

// Student Subjects
export const subjects = pgTable("subjects", {
    subject_id: serial("subject_id").primaryKey(),
    subject: varchar("subject", { length: 50 }).notNull().unique(),
});
export const subjectRelationships = relations(subjects, ({ many }) => ({
    academics: many(academics), // A subject can have multiple academic records
  }));
  

// Academics
export const academics = pgTable("academics", {
    academic_id: serial("academic_id").primaryKey(),
    student_id: integer("student_id").references(() => students.student_id, { onDelete: "cascade" }).notNull(),
    subject_id: integer("subject_id").references(() => subjects.subject_id, { onDelete: "cascade" }).notNull(),
    grade: varchar("grade", { length: 10 }).notNull(),
    subject_score: smallint("score").notNull(),
    year: smallint("year"),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});
export const academicRelationships = relations(academics, ({ one }) => ({
    student: one(students, {
      fields: [academics.student_id],
      references: [students.student_id],
    }),
    subject: one(subjects, {
      fields: [academics.subject_id],
      references: [subjects.subject_id],
    }),
  }));
  


// Student Career Interests
export const studentCareers = pgTable("student_careers", {
    studentcareers_id: serial("studentcareers_id").primaryKey(),
    student_id: integer("student_id").references(() => students.student_id, { onDelete: "cascade" }),
    career_id: integer("career_id").references(() => careers.career_id, { onDelete: "cascade" }),
});
export const studentCareerRelationships = relations(studentCareers, ({ one }) => ({
    student: one(students, {
      fields: [studentCareers.student_id],
      references: [students.student_id],
    }),
    career: one(careers, {
      fields: [studentCareers.career_id],
      references: [careers.career_id],
    }),
  }));
  


// Student Personal Interests
export const personalIntrests = pgTable("student_interests", {
    id: serial("id").primaryKey(),
    student_id: integer("student_id").references(() => students.student_id, { onDelete: "cascade" }),
    personal_interests: varchar("personal_interests", { length: 100 }).notNull(),
});
export const studentInterestRelationships = relations(personalIntrests, ({ one }) => ({
    student: one(students, {
      fields: [personalIntrests.student_id],
      references: [students.student_id],
    }),
  }));
  



export type TIstudents = typeof students.$inferInsert;
export type TSstudents = typeof students.$inferSelect;
export type TICareers = typeof careers.$inferInsert;
export type TSCareers = typeof careers.$inferSelect;
export type TIRecommendations = typeof recommendations.$inferInsert;
export type TSRecommendations = typeof recommendations.$inferSelect;
export type TIFeedback = typeof feedback.$inferInsert;
export type TSFeedback = typeof feedback.$inferSelect;
