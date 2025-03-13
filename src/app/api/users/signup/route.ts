import userModel from "@/models/userModel"
import connect from "@/dbConfig/dbConfig"

import bcryptjs from "bcryptjs"

import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/helpers/mailer"


export  async function POST(request : NextRequest){
    
     
    try {
        await connect()
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        const user = await userModel.findOne({email})

        //check if user already exists.
        if(user){
            return NextResponse.json({error : "User already exists"},{status : 500})
        }

        //hashing password
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt)
        
        //if user is already there, create one.
        const createdUser = await userModel.create({
            username, 
            email, 
            password : hash

        })

        console.log(createdUser);

        //Sending an email
        sendEmail({email, emailType : "VERIFY", userId : createdUser._id})

        return NextResponse.json({message : "user created successfully", succcess : true, createdUser})
        

    } catch (error : any) {
        return NextResponse.json({ error : error.message}, {status : 500})
    }

}