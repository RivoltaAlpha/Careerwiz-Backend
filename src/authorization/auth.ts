import "dotenv/config";
import { verify } from "hono/jwt";
import { Context, Next } from "hono";
// hono interface
interface HonoContext <T> {
    user?: T;
    }
    
export const verifyToken = async (token:string, secret:string) => {
    try{
        const decoded = await verify(token as string, secret)
        return decoded;
    } catch (error: any) {
        return null;
    }
}

export const authMiddleware = async (c:Context & {req: HonoContext<any> }, next: Next, requiredRole: string) => {
    const token = c.req.header('Authorization')?.replace("Bearer ", "").trim();
    console.log("Token:", token);
    if (!token) return c.json({ error: 'Provide correct Token😒😒😒😏' }, 401);
    
    const decoded = await verifyToken(token, process.env.JWT_SECRET as string);
    console.log("Decoded:", decoded);
    if (!decoded) return c.json({ error: 'Invalid token 😏😏😏😏' }, 401);

  // Role check
  const userRole = decoded.role;
  // console.log("student Role:", studentRole);
  // console.log("Required Role:", requiredRole);

    // Authorization
    if (
        (requiredRole === "both" && (userRole === "admin" || userRole === "student")) ||
        userRole === requiredRole
      ) 
      // authenticate all
      {
        c.req.user = decoded;
        return next();
      }
        return c.json({error: "'Forbidden because you are Unauthorised😭😭😭😭😭" }, 403);
        }


export const authenticateAdmin = async  (c: Context, next: Next) => await authMiddleware(c, next, "admin")
export const authenticatestudent = async  (c: Context, next: Next) => await authMiddleware(c, next, "student")
