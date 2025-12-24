import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) res.status(401).json({ msg: "No token, autorizacion denegada" });

    jwt.verify(token, TOKEN_SECRET, (e, user) => {
        if(e) return res.status(403).json({msg: "Token Invalido"})

            req.user = user

            
    } )

  next();
};
