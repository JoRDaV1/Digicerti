import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "@/types/ReqResTypes";

const JWT_TOKEN: string | undefined = process.env.JWT_TOKEN;
const fetchuser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");

  if (!token) {
   return  res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    if (!JWT_TOKEN) {
      throw new Error("JWT token is not defined");
    }
    const rawdata = jwt.verify(token || "", JWT_TOKEN) as JwtPayload;
    req.user = rawdata.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

export default fetchuser;
