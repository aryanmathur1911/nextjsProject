import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest): JwtPayload => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      throw new Error("Token not found");
    }
    const decodedUser = jwt.verify(token, process.env.TOKEN_SECRET!);
    if (typeof decodedUser === "string") {
      throw new Error("Invalid token payload");
    }
    return decodedUser as JwtPayload;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error verifying token");
  }
};