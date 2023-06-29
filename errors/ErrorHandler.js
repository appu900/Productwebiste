class ErrorHandler{
    constructor(status,msg){
        this.status = status;
        this.message = msg;
    }

    static validationError(message = 'All fields are required'){
        return new ErrorHandler(422,message)
    }

    static notFoundEroor(message = "not found"){
        return new ErrorHandler(404,message)
    }

    static serverError(message = "internal error"){
        return new ErrorHandler(500,message);
    }
}


module.exports = ErrorHandler;