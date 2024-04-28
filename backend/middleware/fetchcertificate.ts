import { Request, Response, NextFunction } from "@/types/ReqResTypes";

const fetchcertificate = (req: Request, res: Response, next: NextFunction) => {
  // Get the user from the jwt token and add id to req object
  try {
  const certificateid = req.header("certificateid");

  if (!certificateid) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid certificate id" });
  }
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};

export default fetchcertificate;
