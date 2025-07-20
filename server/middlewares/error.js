export const errorMiddleware = (err, req, res, next ) =>{
    const errorMessage = err.message || "Internal Server Error";
    const errorStatus = err.status || 500;

   
    if(errorStatus === 11000 ){
        errorMessage = "Email already exists";
        errorStatus = 400;
        return next(err); 
    }

    if(err.name === "castError"){
        errorMessage = "Invalid id";
        errorStatus = 400;
        return next(err);
    }   

    res.status(errorStatus).json({
        success: false,
        message: errorMessage,
    });
};

