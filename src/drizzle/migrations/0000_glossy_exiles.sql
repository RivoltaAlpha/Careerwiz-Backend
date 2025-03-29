CREATE TABLE "academics" (
	"academic_id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"subjects" text NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_careers" (
	"careerInterests_id" serial PRIMARY KEY NOT NULL,
	"student_id" integer,
	"career_id" integer
);
--> statement-breakpoint
CREATE TABLE "careers" (
	"career_id" serial PRIMARY KEY NOT NULL,
	"career_name" varchar(100) NOT NULL,
	"description" text NOT NULL,
	"requirements" varchar(100) NOT NULL,
	"subjects" varchar(100) NOT NULL,
	"interests" varchar(100) NOT NULL,
	"image" varchar(200) DEFAULT 'https://thumbs.dreamstime.com/z/career-concept-technology-light-background-blurred-abstract-168248861.jpg'
);
--> statement-breakpoint
CREATE TABLE "feedback" (
	"feedback_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"message" varchar(2000) NOT NULL,
	"contact" varchar(50),
	"student_id" integer,
	"recommendation" integer
);
--> statement-breakpoint
CREATE TABLE "student_interests" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer,
	"personal_interests" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recommendations" (
	"recommendations_id" serial PRIMARY KEY NOT NULL,
	"student_id" integer,
	"student_recommendations" text
);
--> statement-breakpoint
CREATE TABLE "students" (
	"student_id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar(50) NOT NULL,
	"lastname" varchar(50) NOT NULL,
	"username" varchar(50) NOT NULL,
	"password" varchar(255) NOT NULL,
	"email" varchar(50),
	"contact" varchar(50),
	"school" varchar(50) NOT NULL,
	"role" varchar(50) DEFAULT 'student' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "students_username_unique" UNIQUE("username"),
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "subjects" (
	"subject_id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(50) NOT NULL,
	CONSTRAINT "subjects_subject_unique" UNIQUE("subject")
);
--> statement-breakpoint
ALTER TABLE "academics" ADD CONSTRAINT "academics_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_careers" ADD CONSTRAINT "student_careers_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_careers" ADD CONSTRAINT "student_careers_career_id_careers_career_id_fk" FOREIGN KEY ("career_id") REFERENCES "public"."careers"("career_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_recommendation_recommendations_recommendations_id_fk" FOREIGN KEY ("recommendation") REFERENCES "public"."recommendations"("recommendations_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_interests" ADD CONSTRAINT "student_interests_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_student_id_students_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE cascade ON UPDATE no action;