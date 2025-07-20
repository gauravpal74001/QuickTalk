import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/utility.js";


export const isAuthenticated = async (req , res , next) =>{
    const token = req.cookies["Quick-talk-token"];
    if(!token){
        return next(new ErrorHandler("Please login to access this resource" , 401));
    }

    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    req.user = decoded._id; //_id is the id of the user    
    next(); 
};