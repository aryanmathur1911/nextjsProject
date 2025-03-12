import { getDataFromToken } from "@/helpers/getDataFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";

await connect();


export  async  function GET(request : NextRequest){
    try {

        //getDataFromToken will return the data of user from his token 
        //than we will find the user from the database using the user's id we got from the token
        const userData : any = await getDataFromToken(request);
        const user = await userModel.findOne({_id : userData.id}).select("-password");

        //returning the user's info as response , user which we found in above line is stored in data key below.

        //than this data is used in profile page.
        return NextResponse.json({
            message: "user found",
            data : user
        })
    } catch (error : any) {
        return NextResponse.json({error : error.message})
    }
}