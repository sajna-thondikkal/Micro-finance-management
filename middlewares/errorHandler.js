const errorHandler = (error,req,res,next)=>{
    console.log("message from errorhandler",error);
    if(res.headersSent){
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        "message":error.message || 'Server Error'
    })
}

module.exports = errorHandler;