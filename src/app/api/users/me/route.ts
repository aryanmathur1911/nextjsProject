import { getDataFromToken } from "@/helpers/getDataFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

await connect();

interface IUserData {
  id: string;
  username: string;
  email: string;
}

export async function GET(request: NextRequest) {
  try {
    const tokenData = getDataFromToken(request);
    const { id, username, email } = tokenData;
    if (!id || !username || !email) {
      throw new Error("Invalid token payload");
    }
    const userData: IUserData = { id, username, email };

    const user = await userModel.findOne({ _id: userData.id }).select("-password");

    return NextResponse.json({
      message: "user found",
      data: user,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}