import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const connectDB = async ( uri ) =>{
    try {
        await mongoose.connect(uri , {
            dbName: "Quick-Talk",
        });
        console.log(`Connected to MongoDB ${mongoose.connection.host}`);
    } catch (error) {
        throw error;
    }
};


export const sendToken = (res , user , statusCode , message)=>{
    const token = jwt.sign({_id:user._id} , process.env.JWT_SECRET , {expiresIn: "15d"});

    const options = {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true ,
        sameSite: "none",
    }

    res.status(statusCode).cookie("Quick-talk-token" , token , options).json({success: true , message , user});
};


export const TryCatch = (passedFunction) => async(req , res , next)=>{
   try{
       await passedFunction(req , res , next)          
   }
   catch(error){
     next(error);
   }
}; 


export const emitEvents = (req, event ,  user , data)=>{
    console.log("emitEvents");
};

export const deleteFromCloudinary = async(public_url)=>{
    
};




