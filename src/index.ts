import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";
import { Context } from 'hono';
import { cors} from 'hono/cors'
import { trimTrailingSlash } from "hono/trailing-slash";
import { timeout } from "hono/timeout";
import { HTTPException } from "hono/http-exception";
import "dotenv/config"
import { careersRouter } from './careers/route.js';
import { feedbackRouter } from './feedback/route.js';
import { recommendationsRouter } from './recommendations/route.js';
import { studentRouter } from './students/route.js';
import { authRouter } from './authentication/routing.js';
import { careerInterestsRouter } from './career_intrests/route.js';
import { personalIntrestsRouter } from './personal_intrests/route.js';
import { academicsRouter } from './academics/route.js';

const app = new Hono()

// inbuilt middlewares
app.use(logger()); //logs request and response to the console
app.use(trimTrailingSlash()); //removes trailing slashes from the request URL
app.use(cors()) //allows cross-origin requests
app.use(csrf()); // CSRF protection middleware
app.get('/csrf-token', (c: Context) => {
  return c.json({ csrfToken: c.get('csrfToken') });
});

const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  });
app.use("/", timeout(100000, customTimeoutException)); 

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.notFound((c) => {
  return c.text("Route Not Found", 404);
});

app.onError((err, c) => {
  console.error(err);
  return c.text("Internal Server Error", 500);
});

app.get("/timeout", async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000));
  return c.text("data after 5 seconds", 200);
});

// service routes
app.route('/auth', authRouter)
app.route("/", careersRouter);
app.route("/", studentRouter);
app.route("/", feedbackRouter);
app.route("/", recommendationsRouter);
app.route("/", careerInterestsRouter);
app.route("/", personalIntrestsRouter);
app.route("/", academicsRouter);

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000,
});
console.log(`Server is running on port ${process.env.PORT}`);
