import { Context } from "hono";
import "dotenv/config";
import { RegisteringService, loginAuthService } from "./service.js";
import {hash, compare } from "bcrypt";
import { sign, verify } from "hono/jwt";
import { sendWelcomeEmail } from "../emailing/email.js";

export const registerUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    console.log('Received user data:', user); 

    if (!user.password) {
      throw new Error("Password is required");
    }

    const createdUser = await RegisteringService(user);
    if (!createdUser) return c.text("User not created😭😭", 404);

    if (!user.email) {
      throw new Error("Email field is missing in the user data");
    }

    const subject = "Welcome to Career Wiz";
    const html = `
    <html>
      <head>
        <style>
          .email-container {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            padding: 20px;
            border-radius: 5px;
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 3px;
            transition: background-color 0.3s ease;
          }
          .btn:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <p>Hello, ${user.username}</p>
          <p>Welcome to Career Wiz</p>
          <p>oin us and start exploring different Careers available for you, today!
An easier way to identify what career suits you most based on what you love!</p>

          <img src="https://img.freepik.com/free-photo/couple-planning-redecorating-house-using-laptop_23-2148814337.jpg?uid=R154664640&semt=ais_hybrid" alt="Image" style="max-width: 100%; height: auto;">
          <a class="btn" href="https://careerwiz-frontend.vercel.app/">Visit our Website</a>
        </div>
      </body>
    </html>
  `;

    await sendWelcomeEmail(user.email, subject, html);

    return c.json({ msg: "User registered successfully", user: createdUser }, 201);
  } catch (error: any) {
    console.error('Error during registration:', error);
    return c.json({ error: error?.message }, 500);
  }
};



export const loginUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    console.log('Received user data for login:', user);

    const foundUser = await loginAuthService(user);
    if (!foundUser) return c.text("User not found😏", 404);

    console.log('Received password (plaintext):', user.password);
    console.log('Stored hash (in database):', foundUser?.password);

    const isValid = await compare(user.password, foundUser?.password);
    console.log("isValid:", isValid);

    if (!isValid) {
      return c.json({ error: "Invalid credentials😏" }, 401);
    } else {
      const payload = {
        sub: foundUser?.username,
        // role: foundUser?.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 180,
      };
      const secret = process.env.JWT_SECRET as string;
      const token = await sign(payload, secret);
      return c.json({ token, user: { user_id: foundUser?.student_id, username: foundUser?.username, firstname: foundUser?.firstname,lastname: foundUser?.lastname, contact:foundUser?.contact, school:foundUser?.school, email:foundUser?.email} }, 200);
    }
  } catch (error: any) {
    console.error('Error during login:', error);
    return c.json({ error: error?.message }, 400);
  }
};
