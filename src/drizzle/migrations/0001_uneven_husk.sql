ALTER TABLE "feedback" ADD COLUMN "contact" varchar(50);--> statement-breakpoint
ALTER TABLE "feedback" ADD COLUMN "recommendation" integer;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_recommendation_recommendations_recommendations_id_fk" FOREIGN KEY ("recommendation") REFERENCES "public"."recommendations"("recommendations_id") ON DELETE cascade ON UPDATE no action;