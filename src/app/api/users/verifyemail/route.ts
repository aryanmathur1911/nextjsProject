import connect from "@/dbConfig/dbConfig";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await userModel.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.log("User's token expiry:", user?.verifyTokenExpiry);
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }

    console.log(user);

    user.isVarified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({ message: "Email verified", success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 400 });
  }
}
