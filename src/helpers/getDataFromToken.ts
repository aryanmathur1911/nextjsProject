import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// a function to extract data of user from his token 

export  const getDataFromToken = (request: NextRequest) => {
    try {
        //Catching the token from the cookies
        const token = request.cookies.get("token") ?.value || "";

        //Verifying the token will return the information inside the token (you can check it in the login route) 
        const decodedUser = jwt.verify(token , process.env.TOKEN_SECRET!)

        //retruning all the information about user 
        return decodedUser;
        
    } catch (error : any) {
        throw new Error(error.message);
    }
} 

//Now this function will be used in me route to get the data of user from his token, check out there.