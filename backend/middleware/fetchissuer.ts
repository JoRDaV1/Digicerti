import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "@/types/ReqResTypes";

const JWT_TOKEN = process.env.JWT_TOKEN as string;
const fetchuser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    console.log("entering loop");
    const rawdata = jwt.verify(token || "", JWT_TOKEN) as jwt.JwtPayload;
    console.log(rawdata);
    req.issuer = rawdata.issuer;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

export default fetchuser;
