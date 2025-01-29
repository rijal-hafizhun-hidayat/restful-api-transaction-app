import type { user } from "@prisma/client";
import Jwt from "jsonwebtoken";
import { BlacklistUtil } from "./blacklist-util";

export class TokenUtil {
  static async generateToken(user: user): Promise<string> {
    try {
      const token = Jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
      );

      return token;
    } catch (error) {
      throw new Error("Could not generate token.");
    }
  }

  static async verifyToken(token: string) {
    const jwtKey = process.env.JWT_KEY as string;
    if (!jwtKey) {
      throw new Error("JWT_KEY is not defined in the environment variables.");
    }

    if (BlacklistUtil.hasTokenBlacklist(token)) {
      throw new Error("token is revoked");
    }

    try {
      return Jwt.verify(token, jwtKey);
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token has expired");
      } else if (error.name === "JsonWebTokenError") {
        throw new Error("Invalid token");
      } else {
        throw new Error("Could not verify token");
      }
    }
  }
}
