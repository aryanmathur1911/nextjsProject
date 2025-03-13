import userModel from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await userModel.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 500 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    const createdUser = await userModel.create({
      username,
      email,
      password: hash,
    });

    console.log(createdUser);

    sendEmail({ email, emailType: "VERIFY", userId: createdUser._id.toString() });

    return NextResponse.json({
      message: "user created successfully",
      succcess: true,
      createdUser,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}