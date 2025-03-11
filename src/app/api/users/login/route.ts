import userModel from "@/models/userModel"
import connect from "@/dbConfig/dbConfig"

import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import { NextRequest, NextResponse } from "next/server"


export  async function POST(request : NextRequest){
    
     
    try {
        await connect();
        const reqBody = await request.json();
        const {email, password} = reqBody
        console.log(reqBody);

        //checking if user exist or not 
        const user = await userModel.findOne({email})

        if(!user){
            return NextResponse.json({message : "No such user exists"}, {status : 400});
        }

        //check if the password is correct
        const result =await  bcryptjs.compare(password, user.password)
        if(!result){
            return NextResponse.json({message : "Invalid email or password."})
        }
        
        //creating token data on basis of which token would be created.
         const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
         }

        //creating token
        
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!);
        const response = NextResponse.json({
            message : "Logged in successfully",
            success : true
        })

        response.cookies.set("token", token, {httpOnly : true});

        return response;




    } catch (error : any) {
       return NextResponse.json({error : error.message}, {status : 500});
    }

}