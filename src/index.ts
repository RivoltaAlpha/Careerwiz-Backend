import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";
import {cors} from 'hono/cors'
import { trimTrailingSlash } from "hono/trailing-slash";
import { timeout } from "hono/timeout";
import { HTTPException } from "hono/http-exception";
import "dotenv/config"
import { careersRouter } from './careers/route';
import { feedbackRouter } from './feedback/route';
import { recommendationsRouter } from './recommendations/route';
import { studentRouter } from './students/route';
import { authRouter } from './authentication/routing';

const app = new Hono()

// inbuilt middlewares
app.use(logger()); //logs request and response to the console
app.use(csrf()); //prevents CSRF attacks by checking request headers.
app.use(trimTrailingSlash()); //removes trailing slashes from the request URL
app.use(cors()) //allows cross-origin requests

const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  });
app.use("/", timeout(100000, customTimeoutException)); //sets a timeout of 10 seconds for all requests


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


const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000,
});
console.log(`Server is running on port ${process.env.PORT}`);
