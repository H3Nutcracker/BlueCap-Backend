import jwt from "jsonwebtoken";
import { ENV } from "./env";

export function signToken(payload: object): string {
  const secret = ENV.JWT_SECRET as string;

  return jwt.sign(payload as jwt.JwtPayload, secret);
}

export function verifyToken(token: string): any {
  return jwt.verify(token, ENV.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new Error("Token verification failed");
    }
    return decoded;
  });
}
