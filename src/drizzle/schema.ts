import { relations } from "drizzle-orm";
import {  serial, text,varchar, timestamp, integer, pgTable, smallint, jsonb } from "drizzle-orm/pg-core";

// Students
export const students = pgTable("students", {
    student_id: serial("student_id").primaryKey(),
    firstname: varchar("firstname", { length: 50 }).notNull(),
    lastname: varchar("lastname", { length: 50 }).notNull(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
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
    careerInterests: many(careerInterests),
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
    image: varchar("image", { length: 200 }).default("https://thumbs.dreamstime.com/z/career-concept-technology-light-background-blurred-abstract-168248861.jpg"),
});
export const careerRelationships = relations(careers, ({ many }) => ({
    careerInterests: many(careerInterests), // A career can be linked to multiple students
  }));


// Recommendations
export const recommendations = pgTable("recommendations", {
    recommendations_id: serial("recommendations_id").primaryKey(),
    student_id: integer("student_id").references(() => students.student_id, {onDelete: "cascade"}),
    student_recommendations: jsonb("student_recommendations"),

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
    contact: varchar("contact", { length: 50 }),
    student_id: integer("student_id").references(() => students.student_id, { onDelete: "cascade" }),
    recommendation: integer("recommendation").references(() => recommendations.recommendations_id, {onDelete: "cascade"})
});
export const feedbackRelationships = relations(feedback, ({ one }) => ({
    student: one(students, {
      fields: [feedback.student_id],
      references: [students.student_id],
    }),
  }));

// Academics
export const academics = pgTable("academics", {
    academic_id: serial("academic_id").primaryKey(),
    student_id: integer("student_id").references(() => students.student_id, { onDelete: "cascade" }).notNull(),
    subjects: jsonb("subjects").notNull(),
    academic_history: jsonb("academic_history").notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
});
export const academicRelationships = relations(academics, ({ one }) => ({
    student: one(students, {
      fields: [academics.student_id],
      references: [students.student_id],
    })
  }));


// Student Career Interests
export const careerInterests = pgTable("student_careers", {
    careerInterests_id: serial("careerInterests_id").primaryKey(),
    student_id: integer("student_id").references(() => students.student_id, { onDelete: "cascade" }),
    career_id: integer("career_id").references(() => careers.career_id, { onDelete: "cascade" }),
});
export const studentCareerRelationships = relations(careerInterests, ({ one }) => ({
    student: one(students, {
      fields: [careerInterests.student_id],
      references: [students.student_id],
    }),
    career: one(careers, {
      fields: [careerInterests.career_id],
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
export type TIcareerInterests = typeof careerInterests.$inferInsert;
export type TScareerInterests = typeof careerInterests.$inferSelect;
export type TIpersonalIntrests = typeof personalIntrests.$inferInsert;
export type TSpersonalIntrests = typeof personalIntrests.$inferSelect;
export type TIRecommendations = typeof recommendations.$inferInsert;
export type TSRecommendations = typeof recommendations.$inferSelect;
export type TIFeedback = typeof feedback.$inferInsert;
export type TSFeedback = typeof feedback.$inferSelect;
export type TIacademics = typeof academics.$inferInsert;
export type TSacademics = typeof academics.$inferSelect;
