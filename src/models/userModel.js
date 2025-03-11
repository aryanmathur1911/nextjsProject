import mongoose from "mongoose"

const  userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please enter username"],
        unique : true
    },

    email : {
        type : String,
        required : [true, "Please enter your email"],
        unique : true
    },

    password : {
        type : String,
        required : [true, "Please enter the password"]
    },

    isVarified : {
        type : Boolean,
        default : false
    },

    isAdmin : {
        type : Boolean,
        default : false 
    },

    forgotPasswordToken : String,
    forgotPasswordExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date
    
})

const userModel = mongoose.models.users||mongoose.model("users",userSchema)

export default userModel