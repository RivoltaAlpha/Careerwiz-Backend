import {Hono} from 'hono'
import { zValidator } from "@hono/zod-validator";
import { loginUserShema, registerUserShema } from "../validator.js";
import { loginUser, registerUser } from "./controller.js"

export const authRouter = new Hono();

authRouter.post('/register', zValidator("json", registerUserShema, (result, c) =>{
    if(!result.success){
        return c.json({error: result.error.message}, 400)
        }
}), registerUser);



authRouter.post('/login', zValidator("json", loginUserShema, (result, c) =>{
    if(!result.success){
        return c.json({error: result.error.message}, 400)
        }
}), loginUser);
